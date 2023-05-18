# README

### 前端router逻辑

<App/>定义了登录、登出、主页的router

==》跳转至BasicView，检验用户权限（未登录页面和user一致）

==》跳至HomeView（用户界面，管理员是AdminHomeView），HomeView中定义了用户所有界面的route逻辑，根据菜单跳转

