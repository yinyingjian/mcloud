# 安装

每个服务独立添加用户
```sh
use mcenter
db.createUser({user: "mcenter", pwd: "123456", roles: [{ role: "dbOwner", db: "mcenter" }]})

use mflow
db.createUser({user: "mflow", pwd: "123456", roles: [{ role: "dbOwner", db: "mflow" }]})
```