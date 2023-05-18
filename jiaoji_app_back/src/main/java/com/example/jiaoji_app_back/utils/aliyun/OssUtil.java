package com.example.jiaoji_app_back.utils.aliyun;

import com.aliyun.oss.OSSClient;
import com.aliyun.oss.model.CannedAccessControlList;
import com.aliyun.oss.model.CreateBucketRequest;
import com.aliyun.oss.model.ObjectMetadata;
import com.aliyun.oss.model.PutObjectResult;
import lombok.Data;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.Random;

/*
 * @Author dxm
 * @Brief 阿里云OSS工具类
 *  */
@Data
public class OssUtil {
    private static String ENDPOINT="oss-cn-shanghai.aliyuncs.com";//外网访问节点
    private static String AccessKeyID="LTAI5tLZBt9f7G5XT5MKqwJE"; //accID
    private static String AccessKeySecret="nsTyzTn7hY5uVoRRObIexkH71bbIfk";//ACCSecret
    private static String BUKETNAME="jiao-ji";//仓库名称
    private static String SUFFER_URL ="http://"+BUKETNAME+"."+ENDPOINT; //上传成功返回的url，仓库名称+节点地址
    /**
     * 获取oss链接
     */
    public OSSClient getOSSClient(){
        OSSClient ossClient=new OSSClient(ENDPOINT,AccessKeyID,AccessKeySecret);
        //判断是否存在仓库
        if (ossClient.doesBucketExist(BUKETNAME)){
            System.out.println("存在仓库");
            ossClient.shutdown();
        }else{
            System.out.println("不存在仓库....创建一个仓库"+BUKETNAME);

            CreateBucketRequest bucketRequest=new CreateBucketRequest(null);
            bucketRequest.setBucketName(BUKETNAME);//设置仓库名称
            bucketRequest.setCannedACL(CannedAccessControlList.PublicRead);//设置仓库权限 公共读

            ossClient.createBucket(bucketRequest);
            ossClient.shutdown();
        }
        return ossClient;
    }

    /**
     * 上传图片
     * @param file
     * @return 图片的路径
     */
    public String uploadImg2Oss(MultipartFile file) {
        if (file.getSize() > 1024 * 1024 *20) { //20M
            return "图片太大";
        }
        String originalFilename = file.getOriginalFilename();
        String substring = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        Random random = new Random();
        String name = random.nextInt(10000) + System.currentTimeMillis() + substring;
        try {
            InputStream inputStream = file.getInputStream();
            this.uploadFile2OSS(inputStream, name);
            return name;//RestResultGenerator.createSuccessResult(name);
        } catch (Exception e) {
            return "上传失败";
        }
    }
    /**
     * 上传图片获取fileUrl
     * @param instream
     * @param fileName
     * @return
     */
    private String uploadFile2OSS(InputStream instream, String fileName) {
        String ret = "";
        try {
            //创建上传Object的Metadata
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(instream.available());
            objectMetadata.setCacheControl("no-cache");
            objectMetadata.setHeader("Pragma", "no-cache");
            objectMetadata.setContentType(getcontentType(fileName.substring(fileName.lastIndexOf("."))));
            objectMetadata.setContentDisposition("inline;filename=" + fileName);
            //上传文件

            OSSClient ossClient = new OSSClient(ENDPOINT, AccessKeyID, AccessKeySecret);
            PutObjectResult putResult = ossClient.putObject(BUKETNAME, SUFFER_URL + fileName, instream, objectMetadata);
            ret = putResult.getETag();
        } catch (IOException e) {
            e.getMessage();
        } finally {
            try {
                if (instream != null) {
                    instream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return ret;
    }

    public static String getcontentType(String FilenameExtension) {
        if (FilenameExtension.equalsIgnoreCase(".bmp")) {
            return "image/bmp";
        }
        if (FilenameExtension.equalsIgnoreCase(".gif")) {
            return "image/gif";
        }
        if (FilenameExtension.equalsIgnoreCase(".jpeg") ||
                FilenameExtension.equalsIgnoreCase(".jpg") ||
                FilenameExtension.equalsIgnoreCase(".png")) {
            return "image/jpg";
        }
        if (FilenameExtension.equalsIgnoreCase(".html")) {
            return "text/html";
        }
        if (FilenameExtension.equalsIgnoreCase(".txt")) {
            return "text/plain";
        }
        if (FilenameExtension.equalsIgnoreCase(".vsd")) {
            return "application/vnd.visio";
        }
        if (FilenameExtension.equalsIgnoreCase(".pptx") ||
                FilenameExtension.equalsIgnoreCase(".ppt")) {
            return "application/vnd.ms-powerpoint";
        }
        if (FilenameExtension.equalsIgnoreCase(".docx") ||
                FilenameExtension.equalsIgnoreCase(".doc")) {
            return "application/msword";
        }
        if (FilenameExtension.equalsIgnoreCase(".xml")) {
            return "text/xml";
        }
        return "image/jpg";
    }

    /**
     * 获取图片路径
     * @param fileUrl
     * @return
     */
    public String getImgUrl(String fileUrl) {
        if (!StringUtils.isEmpty(fileUrl)) {
            String[] split = fileUrl.split("/");
            String url =  getUrl(SUFFER_URL + split[split.length - 1]);
//                log.info(url);
            String[] spilt1 = url.split("\\?");
            return spilt1[0];
//            return url;
        }
        return null;
    }

    /**
     * 获得url链接
     *
     * @param key
     * @return
     */
    public String getUrl(String key) {
        // 设置URL过期时间为10年  3600l* 1000*24*365*10
        Date expiration = new Date(new Date().getTime() + 3600l * 1000 * 24 * 365 * 10);
        // 生成URL
        OSSClient ossClient = new OSSClient(ENDPOINT, AccessKeyID, AccessKeySecret);
        URL url = ossClient.generatePresignedUrl(BUKETNAME, key, expiration);
        if (url != null) {
            return url.toString();
        }
        return null;
    }

    /**
     * 多图片上传
     * @param fileList
     * 用；分割
     * @return
     */
    public String checkList(List<MultipartFile> fileList) {
        String  fileUrl = "";
        String  str = "";
        String  photoUrl = "";
        for(int i = 0;i< fileList.size();i++){
            fileUrl = uploadImg2Oss(fileList.get(i));
            str = getImgUrl(fileUrl);
            if(i == 0){
                photoUrl = str;
            }else {
                photoUrl += ";" + str;
            }
        }
        return photoUrl.trim();
    }

    /**
     * 单个图片上传
     * @param file
     * @return
     */
    public String checkImage(MultipartFile file){
        String fileUrl = uploadImg2Oss(file);
        String str = getImgUrl(fileUrl);
        return str.trim();
    }

//    public static void main(String[] args) {
//        OssUtil util=new OssUtil();
//        util.getOSSClient();
//    }

}
