---
title: 使用 Docker容器配置 MySQL 主从数据库
icon: https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/docker.svg
category:
  - 动力节点
  - Docker
---
# 一、操作

## 1.1 拉取镜像

> 使用 docker pull 命令拉去 MySQL镜像（此处使用版本为 5.7） `docker pull mysql:5.7`


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416213853.png)



## 1.2 创建 volume 和 network

### 1.2.1 volume

> 创建 volume 容器卷

-   主数据库（3307）：`docker volume create mysql5_3406`
-   从数据库（3308）：`docker volume create mysql5_3407`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416214018.png)

### 1.2.2 network

> 创建 docker 网络 `docker network create mysql5-net`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416214057.png)


## 1.3 创建容器

> 主数据库 `mysql5_3406`

-   主数据库：`docker run -d --name mysql5_3406 -e MYSQL_ROOT_PASSWORD=root -v mysql5_3406:/var/lib/mysql -p 3406:3306 --network=mysql5-net <mysql 镜像>`

> 从数据库 `mysql5_3407`


-   从数据库：`docker run -d --name mysql5_3407 -e MYSQL_ROOT_PASSWORD=root -v mysql5_3407:/var/lib/mysql -p 3407:3306 --network=mysql5-net <mysql 镜像>`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416214546.png)



## 1.4 配置节点

> 通过 `docker exec -it <容器 id> bash` 进入容器后，因为默认情况下我们创建的 MySQL 容器中并没有安装 `vim` 命令，所以我们先安装 `vim`:

-   `apt-get update`
-   `apt-get install vim`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416215835.png)



### 1.4.1 配置主节点

> 进入 mysql 配置目录

-   `docker exec -it <主数据库容器 id> bash`
-   `cd /etc/mysql`
-   `vim my.cnf`

> 将下段内容配置到 my.cnf 中

```conf
[client]
default_character_set=utf8
[mysqld]
server-id=1 
collation_server = utf8_general_ci
character_set_server = utf8
log-bin=mysql-bin

```

> 通过 `cat my.cnf` 查看是否配置成功。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416221236.png)

> 退出当前容器后`docker restart <容器 id>`重启容器



### 1.4.2 配置从节点

> 进入 mysql 配置目录

-   `docker exec -it <主数据库容器 id> bash`
-   `cd /etc/mysql`
-   `vim my.cnf`

> 将下段内容配置到 my.cnf 中

```conf
[client]
default_character_set=utf8
[mysqld]
collation_server = utf8_general_ci
character_set_server = utf8
server-id=2  
log-bin=mysql-slave-bin   
relay_log=edu-mysql-relay-bin 

```

> 通过 `cat my.cnf` 查看是否配置成功。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416222236.png)

> 退出当前容器后`docker restart <容器 id>`重启容器



## 1.5 主节点授权 slave

- 进入容器 `docker exec -it <容器 id> bash`
- 使用 `mysql -uroot -p` 进入mysql
-   进入主数据库输入 `GRANT REPLICATION SLAVE ON *.* to 'slave'@'%' identified by '123456';`授权 slave这里表示创建一个slaver同步账号slave，允许访问的IP地址为%，%表示通配符
-   使用 `show master status\G;`查看状态，记住File、Position的值，在Slave中将用到。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416221551.png)

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416221904.png)


## 1.6 从节点运行 slave

>使用 `docker network inspect mysql5-net | grep -A 3 'mysql5_3406' | grep 'IPv4Address'`查询出主数据库 ip

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416220505.png)


-   进入从数据库输入 `change master to master_host='<主数据库 ip>',master_user='slave',master_password='123456',master_log_file='<file>',master_log_pos=<pos>,master_port=3306;`
-   `start slave;` 启动主从复制
-   `show slave status\G;` 查看状态

```shell
change master to master_host='172.21.0.2',master_user='slave',master_password='123456',master_log_file='mysql-bin.000001',master_log_pos=154,master_port=3306;
```

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416223103.png)

# 二、验证效果

## 2.1 连接数据库

> 在主数据库 3406 中创建 `testSlave` 数据库
> 相应的在从数据库 3407 中自动同步主数据库相关操作

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416223215.png)
