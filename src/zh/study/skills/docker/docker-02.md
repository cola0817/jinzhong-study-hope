---
title: Docker 安装常用服务
icon: https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/docker.svg
category:
  - 动力节点
  - Docker
---

# 一、使用Docker安装常用服务

##  1.1 Mysql 的安装与配置

1. 拉取 Mysql 镜像 `docker pull mysql`
2. 创建容器卷 `docker volume create mysql8_3306`
3. 创建 Docker 网络 `docker network create mysql8-net`
4. 运行 Docker 容器

```shell
docker run -d --name mysql8_3306 -e MYSQL_ROOT_PASSWORD=root -v mysql8_3306:/var/lib/mysql -p 3306:3306 --network=mysql8-net <镜像 id>
```


## 1.2 redis 的安装与配置

1. 拉取 Redis 镜像 `docker pull redis:6.0.8`
2. 创建容器卷 `docker volume create redis6_6379`
3. 创建 Docker 网络 `docker network create redis6-net`

4. 自定义配置

> 1. 使用 `docker volume inspect redis6_6379` 查看容器卷的详细信息
> 2. 进入相关目录 `cd /var/lib/docker/volumes/redis6_6379`
> 3. 创建 redis.conf 文件 `vim redis.conf` 输入 Redis 配置文件 文件中的内容

::: tip 注意

不要将 `redis.conf` 文件创建在 `_data` 文件夹下，应将其创建在上层目录

:::

::: details Redis 配置文件

```properties
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
# bind 127.0.0.1

protected-mode no
port 6379
tcp-backlog 511
#requirepass 000415
timeout 0
tcp-keepalive 300
daemonize no
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile ""
databases 30
always-show-logo yes
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir ./
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-disable-tcp-nodelay no
replica-priority 100
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no
appendonly yes
appendfilename "appendonly.aof"
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes
lua-time-limit 5000
slowlog-max-len 128
notify-keyspace-events ""
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100
activerehashing yes
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
```



:::

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416110553.png)

5. 运行 Docker 容器

```shell
docker run -d --name redis6_6379 -v redis6_6379:/usr/local/redis -p 6379:6379 --network=redis6-net <镜像 id> redis-server /usr/local/redis/redis.conf
```

## 1.3 Nginx 的安装与配置

1. 拉取 Nginx 镜像 `docker pull nginx`
2. 创建容器卷 `docker volume create nginx_80`
3. 创建 Docker 网络 `docker network create nginx-net`

4. 自定义配置

> 1. 使用 `docker volume inspect nginx_80` 查看容器卷的详细信息
> 2. 进入相关目录 `cd /var/lib/docker/volumes/nginx_80`
> 3. 创建 nginx.conf 文件 `vim nginx.conf` 输入Nginx 配置文件 文件中的内容
> 4. 使用 `mkdir conf.d` 创建 conf.d 文件夹 `vim default.conf` 输入 [[default.conf]] 文件中的内容

::: details Nginx 配置文件

```shell
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    include       "/etc/nginx/conf.d/nginx.conf";
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        off;  #将on 改为 off
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

}
```

:::

::: details Nginx default.conf

```shell
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```



:::

5. 运行 Docker 容器

::: tip 注意

因为 `Docker -v` 命令不支持使用容器卷名称直接映射文件所以此处使用容器卷的绝对位置进行映射

:::

```shell
docker run -d --name nginx_80 -v <容器卷绝对位置>/html:/usr/share/nginx/html -v <容器卷绝对位置>/nginx.conf:/etc/nginx/conf.conf -v <容器卷绝对位置>/conf.d:/etc/nginx/conf.d -p 80:80 --network=nginx-net <镜像 id>
```