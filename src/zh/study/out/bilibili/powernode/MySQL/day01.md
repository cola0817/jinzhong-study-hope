---
title: MySQL 基础
icon: https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/MySQL-icon-02.svg
category:
  - 动力节点
  - mysql
---

# 1、数据库概述及数据准备

## 1.1、SQL 概述

::: info

SQL 一般发音为 `sequel`，SQL 的全称 ==Structured Query Language==，SQL 用来和数据库打交道，完成和数据库的通信，SQL 是一套标准。但是每一个数据库都有自己的特性是别的数据库没有,当使用这个数据库特性相关的功能,这时 SQ L语句可能就不是标准了. (90% 以上的 SQL 都是通用的)

:::

## 1.2、什么是数据库

- 数据库，通常是一个或一组文件，保存了一些符合特定规格的数据,数据库对应的英语单词是DataBase ,简称: DB 。
- 数据库软件称为数据库管理系统（DBMS），全称为 DataBase Management System，如：Oracle、SQL Server、MySql、Sybase、informix、DB2、interbase、PostgreSql 。

## 1.3、MySQL 概述

MySQL 最初是由 MySQL AB 公司开发的一套关系型数据库管理系统（RDBMS-Relational Database Mangerment System）。

MySQL 不仅是最流行的开源数据库，而且是业界成长最快的数据库，每天有超过 7 万次的下载量，其应用范围从大型企业到专有的嵌入应用系统。

MySQL AB 是由两个瑞典人和一个芬兰人：David Axmark、Allan Larsson 和 Michael Monty Widenius在瑞典创办的。

在2008 年初，Sun Microsystems 收购了 MySQL AB 公司。在 2009 年，Oracle 收购了 Sun 公司，使 MySQL 并入Oracle 的数据库产品线。

## 1.4、MySQL 的安装

::: tip MySQL 的安装方式

- 通过 `Docker` 安装 （P.S. Docker 的安装以及使用 Docker 安装常用服务）
- 通过[MySQL 官网 Download MySQL Installer](https://dev.mysql.com/downloads/installer/) 安装 （社区版）

:::

## 1.5、表

表 ( table )是一种 **结构化的文件**，可以用来存储特定类型的数据，如：学生信息，课程信息，都可以放到表中。另外表都有特定的名称，而且不能重复。表中具有几个概念：列、行、主键。 列叫做字段 ( Column ),行叫做表中的记录.

::: tip 关于表的字段的概括

每一个字段都有

- 字段名称
- 字段数据类型
- 字段约束(e.g. 字段长度)

:::

::: note 学生表

| 学号（主键） | 姓名 | 性别 | 年龄 |
| ------------ | ---- | ---- | ---- |
| 00001        | 张三 | 男   | 20   |
| 00002        | 李四 | 女   | 20   |

:::

## 1.6、SQL的分类

::: note SQL 语句的分类

- 数据查询语言 **DQL** (Data Query Language)

代表关键字: `SELECT`

- 数据操纵语言 **DML** (Data Manipulation Language)

代表关键字: `INSERT,DELETE,UPDATE`

- 数据定义语言 **DDL** (Data Definition Language)

代表关键字: `CREATE,DROP,AlERT`

- 事务控制语言 **TCL** (Transactional Control Language)

代表关键字: `COMMIT,ROLLBACK`

- 数据控制语言 **DCL** (Data Control Language)

代表关键字: `GRANT,REVOKE`

:::

## 1.7、导入演示数据

1)  连接 MySQL (`mysql -uroot -p` 后根据提示输入密码)

2)  创建 bjpowernode 数据库 (`CREATE DATABASE bjpowernode;`)

3)  选择数据库 (`USE bjpowernode;`)

4)  导入数据 (`SOURCE {sql 脚本的绝对路径}`)

5)  删除数据库(`DROP DATABASE bjpowernode;`这里不要做 !)

## 1.8、表结构描述

表名称：dept

描述：部门信息表

| 英文字段名称 | 中文描述 | 类型         |
| ------------ | -------- | ------------ |
| DEPTNO       | 部门编号 | INT (2)      |
| DNAME        | 部门名称 | VARCHAR (14) |
| LOC          | 位置     | VARCHAR (13) |

表名称：emp

描述：员工信息表

| 英文字段名称 | 中文描述 | 类型         |
| ------------ | -------- | ------------ |
| EMPNO        | 员工编号 | INT (4)      |
| ENAME        | 员工姓名 | VARCHAR (10) |
| JOB          | 工作岗位 | VARCHAR (9)  |
| MGR          | 上级领导 | INT (4)      |
| HIREDATE     | 入职日期 | DATE         |
| SAL          | 薪水     | DOUBLE (7,2) |
| COMM         | 津贴     | DOUBLE (7,2) |
| DEPTNO       | 部门编号 | INT (2)      |

::: warning 注意

DEPTNO 字段是外键，DEPTNO 的值来源于 dept 表的主键，起到了约束的作用

:::

表名称：salgrade

描述：薪水等级信息表

| 英文字段名称 | 中文描述 | 类型 |
|--------------|----------|------|
| GRADE        | 等级     | INT  |
| LOSAL        | 最低薪水 | INT  |
| HISAL        | 最高薪水 | INT  |

# 2、常用命令

## 2.1、查看 msyql 版本

- MySQL 程序选项具有以下两种通用形式：

    - 长选项，由单词之前加两个减号组成

    - 短选项，由单个字母之前加一个减号组成

```shell
root@a5090f7d950d:/# mysql --version
mysql  Ver 8.0.21 for Linux on x86_64 (MySQL Community Server - GPL)
root@a5090f7d950d:/# mysql -V
mysql  Ver 8.0.21 for Linux on x86_64 (MySQL Community Server - GPL)
```

## 2.2、创建数据库

1.  `CREATE DATABASE {数据库的名称};`

```sql
CREATE DATABASE bjpowernode;
```

2.  `USE {数据库名称};`

```sql
use bjpowernode;
```

在数据库中建立表，因此创建表的时候必须要先选择数据库。

## 2.3、查询当前使用的数据库

- 查询当前使用的数据库
    - `SELECT DATABASE();`
- 查询数据库的版本
    - `SELECT VERSION();`

## 2.4、终止一条语句

如果想要终止一条正在编写的语句，可键入 `\c`。

## 2.5、退出mysql

可通过一下命令退出 MySQL

- `\q`
- `QUIT `
- ` EXIT：`

# 3、查看“演示数据”的表结构

## 3.1、查看和指定现有的数据库

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230818234700.png)

## 3.2、指定当前缺省数据库

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230818234712.png)

## 3.3、查看当前使用的库

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230818234801.png)

## 3.4、查看当前库中的表

![image-20230818234811544](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/image-20230818234811544.png)

## 3.5、查看其他库中的表

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230818234816.png)

## 3.6、查看表的结构

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230818234828.png)
## 3.7、查看表的创建语句

![image-20230818234842228](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/image-20230818234842228.png)
# 4、简单的查询

## 4.1、查询一个字段

- 查询员工姓名

```sql
SELECT ENAME FROM EMP;
```

SELECT 语句后面跟的是字段名称，SELECT 是关键字，SELECT 和字段名称之间采用空格隔开，FROM 表示将要查询的表，它和字段之间采用空格隔开.

## 4.2、查询多个字段

- 查询员工的编号和姓名

```sql
SELECT EMPNO,ENAME FROM EMP;
```

查询多个字段，SELECT 中的字段采用逗号间隔即可，最后一个字段，也就是在 FROM 前面的字段不能使用逗号了。

## 4.3、查询全部字段

可以将所有的字段放到 SELECT 语句的后面，这种方案不方便，但是比较清楚，我们可以采用如下便捷的方式查询全部字段

```sql
SELECT * FROM EMP;
```

::: tip 提示

采用 `SELECT * FROM EMP;`，虽然简单，但是 `*` 号不是很明确，建议查询全部字段将相关字段写到 SELECT 语句的后面,在以后 JAVA 连接数据库的时候,是需要在 Java 程序中编写 SQL 语句的,这个时候编写的 SQL 语句不建议使用 `SELECT *` 这种形式,建议写明字段,这样可读性强.

:::

## 4.4、计算员工的年薪

- 列出员工的编号，姓名和年薪

```sql
SELECT EMPNO,ENAME,SAL*12 FROM EMP;
```

在 SELECT 语句中可以使用运算符，以上存在一些问题，年薪的字段名称不太明确

## 4.5、将查询出来的字段显示为中文

可以采用 `AS` 关键字重命名表字段，其实 `AS` 也可以省略，如：

```sql
SELECT EMPNO,ENAME,SAL*12 AS '年薪' FROM EMP;
SELECT EMPNO,ENAME,SAL*12 '年薪' FROM EMP;
```

# 5、条件查询

条件查询需要用到 `WHERE` 语句，`WHERE` 必须放到 `FROM` 语句表的后面

## 5.1、等号操作符

- 查询薪水为 5000 的员工

```sql
SELECT EMPNO,ENAME,SAL FROM EMP WHERE SAL=5000;
```

- 查询 job 为 MANAGER 的员工

```sql
SELECT EMPNO,ENAME,JOB FROM EMP WHERE JOB='MANAGER';
SELECT EMPNO,ENAME,JOB FROM EMP WHERE JOB='manager';
```

::: tip 注意

MySQL 在 windows下是不区分大小写的，将 script 文件导入 MySQL 后表名也会自动转化为小写，结果再想要将数据库导出放到 linux服务器中使用时就出错了。因为在 linux 下表名区分大小写而找不到表，查了很多都是说在 linux 下更改 MySQL 的设置使其也不区分大小写，但是有没有办法反过来让 windows 下大小写敏感呢。其实方法是一样的，相应的更改 windows 中MySQL的设置就行了。

具体操作：

在 MySQL 的配置文件 my.ini 中增加一行：

```ini
lower_case_table_names = 0
```

其中

- 0 区分大小写
- 1 不区分大小写

MySQL 在 Linux 下数据库名、表名、列名、别名大小写规则是这样的：

1、数据库名与表名是严格区分大小写的

2、表的别名是严格区分大小写的

3、列名与列的别名在所有的情况下均是忽略大小写的

4、变量名也是严格区分大小写的

MySQL在Windows下都不区分大小写

:::

## 5.2、 \<\> 操作符

- 查询薪水不等于 5000 的员工

```sql
SELECT EMPNO,ENAME,SAL FROM EMP WHERE SAL <>5000;
SELECT EMPNO,ENAME,SAL FROM EMP WHERE SAL!=5000;
```

> 下写法等同于以上写法，建议使用第一种写法

- 查询工作岗位不等于MANAGER的员工

```sql
SELECT EMPNO,ENAME,SAL,JOB FROM EMP WHERE JOB <> 'MANAGER';
```



## 5.3、between … and … 操作符

查询薪水为 1600 到 3000 的员工

- (第一种方式，采用 \>= 和 \<=)

```sql
SELECT EMPNO,ENAME,SAL FROM EMP WHERE SAL>=1600 and SAL <= 3000;
```

- (第二种方式，采用between … and …)

```sql
SELECT EMPNO,ENAME,SAL FROM EMP WHERE SAL BETWEEN 1600 AND 3000;
```

::: tip 注意

关于 BETWEEN ... AND 所查找的区间为 `闭区间`.

:::

## 5.4、is null

- Null 为空，但不是空串，为 null 可以设置这个字段不填值，如果查询为 null 的字段，采用 is null

- 查询津贴为空的员工

```sql
SELECT * FROM EMP WHERE COMM IS NULL;
```

## 5.5、 and

and 表示并且的含义，表示所有的条件必须满足

- 工作岗位为 MANAGER ,薪水大于 2500 的员工

```sql
SELECT * FROM EMP WHERE JOB="MANAGER" AND SAL > 2500;
```

## 5.6、or

or 只要满足条件即可,相当于包含

- 查询出 job 为 manager 或者 job 为 salesman 的员工

```sql
SELECT * FROM EMP WHERE JOB="MANAGER" OR JOB = 'SALESMAN';
```

## 5.7、表达式的优先级

查询薪水大于1800，并且部门代码为 20 或 30 的员工

- 错误的写法

```sql
SELECT * FROM EMP WHERE SAL > 1800 AND DEPTNO = 20 OR DEPTNO = 30;
```

> 以上输出不是预期结果，薪水小于 1800 的数据也被查询上来了，原因是表达式的优先级导致的，首先过滤 sal \> 1800 and deptno = 20，然后再将 deptno = 30 员工合并过来，所以是不对的

- 正确的写法

```sql
SELECT * FROM EMP WHERE SAL > 1800 AND (DEPTNO = 20 OR DEPTNO = 30);
```

## 5.8、in

in 表示包含的意思，完全可以采用 or 来表示，采用 in 会更简洁一些

- 查询出 job 为 manager 或者 job 为 salesman 的员工

```sql
SELECT * FROM EMP WHERE JOB IN ('MANAGER','SALESMAN');
```

- 查询出薪水包含 1600 和薪水包含 3000 的员工

```sql
SELECT * FROM EMP WHERE SAL IN (1600,3000);
```

::: tip 注意

此处的 `(1600,3000)` 并不是区间的含义而是指特定的值 `1600` 和 `3000`

:::

## 5.9、not

查询出薪水不包含1600和薪水不包含3000的员工

- （第一种写法）

```sql
SELECT * FROM EMP WHERE SAL <> 1600 AND SAL <> 3000;
```

- 第二种写法

```sql
SELECT * FROM EMP WHERE NOT (SAL =1600 OR SAL = 3000);
```

- 第三种写法

```sql
SELECT * FROM EMP WHERE SAL NOT IN (1600,3000);
```

查询出津贴不为 null 的所有员工

```sql
SELECT * FROM EMP WHERE COMM IS NOT NULL;
```

## 5.10、like

- Like 可以实现模糊查询，like 支持 % 和下划线匹配

- 查询姓名以 M 开头所有的员工

```sql
SELECT * FROM EMP WHERE ENAME LIKE 'M%';
```

- 查询姓名以N结尾的所有的员工

```sql
SELECT * FROM EMP WHERE ENAME LIKE '%N';
```

- 查询姓名中包含O的所有的员工

```sql
SELECT * FROM EMP WHERE ENAME LIKE '%O%';
```

- 查询姓名中第二个字符为A的所有员工

```sql
 SELECT * FROM EMP WHERE ENAME LIKE '_A%';
```

::: note Like中 % 和下划线的差别？

- % 匹配任意字符出现的个数
- 下划线只匹配一个字符

:::

::: danger 提示

Like 中的表达式必须放到单引号中\|双引号中，以下写法是错误的：

```sql
SELECT * FROM EMP WHERE ENAME LIKE _A%;
```

:::

# 6、排序数据

## 6.1、单一字段排序

排序采用 order by 子句，order by 后面跟上排序字段，排序字段可以放多个，多个采用逗号间隔，order by 默认采用升序，如果存在 where 子句那么 order by 必须放到 where 语句的后面

- 按照薪水由小到大排序(系统默认由小到大)

```sql
SELECT * FROM EMP ORDER BY SAL;
```

- 取得 job 为 MANAGER 的员工，按照薪水由小到大排序(系统默认由小到大)

```sql
SELECT * FROM EMP WHERE JOB='MANAGER' ORDER BY SAL;
```

如果包含 where 语句 order by 必须放到 where 后面，如果没有 where 语句 order by 放到表的后面

以下写法是错误的：

```sql
SELECT * FROM EMP ORDER BY SAL WHERE JOB='MANAGER';
```

- 按照多个字段排序，如：首先按照job排序，再按照sal排序

```sql
SELECT * FROM EMP ORDER BY JOB,SAL;
```

## 6.2、手动指定排序顺序

- 手动指定按照薪水由小到大排序

```sql
SELECT * FROM EMP ORDER BY SAL ASC;
```

- 手动指定按照薪水由大到小排序

```sql
SELECT * FROM EMP ORDER BY SAL DESC;
```

## 6.3、多个字段排序

- 按照 job 和薪水倒序

```sql
SELECT * FROM EMP ORDER BY JOB DESC,SAL DESC;
```

如果采用多个字段排序，如果根据第一个字段排序重复了，会根据第二个字段排序

## 6.4、使用字段的位置来排序

- 按照薪水升序

```sql
SELECT * FROM EMP ORDER BY 6;
```

不建议使用此种方式，采用数字含义不明确，程序不健壮

# 7、分组函数/聚合函数/多行处理函数

| count | 取得记录数 |
|-------|------------|
| sum   | 求和       |
| avg   | 取平均     |
| max   | 取最大的数 |
| min   | 取最小的数 |

::: tip 注意

分组函数自动忽略空值，不需要手动的加 where条 件排除空值。

`SELECT count(*) FROM EMP WHERE xxx;` 符合条件的所有记录总数。

`SELECT count(COMM) FROM EMP WHERE SAL > 800;` `COMM`这个字段中不为空的元素总数。

:::

::: danger 重点

分组函数不能直接使用在where关键字后面。

```sql
SELECT * FROM EMP WHERE SAL < avg(SAL);
```

ERROR 1111 (HY000): Invalid use of group function

:::

## 7.1、count

- 取得所有的员工数

```sql
SELECT count(*) FROM EMP;
```

表示取得所有记录，为 null 的值也会取得

- 取得津贴不为 null 员工数

```sql
SELECT count(COMM) FROM EMP;
```

采用 count(字段名称)，不会取得为 null 的记录

- 取得工作岗位的个数

```sql
SELECT count(JOB) FROM EMP;
```

## 7.2、sum

- Sum可以取得某一个列的和，null 会被忽略

- 取得薪水的合计

```sql
SELECT sum(SAL) FROM EMP;
```

- 取得津贴的合计

```sql
SELECT sum(COMM) FROM EMP;
```

null会被忽略

- 取得薪水的合计（sal + comm）

```sql
SELECT sum(SAL+COMM) FROM EMP;
```

从以上结果来看，不正确，原因在于 comm 字段有 null 值，所以无法计算，sum 会忽略掉，正确的做法是将 comm 字段转换成 0

```sql
SELECT sum(SAL+IFNULL(COMM,0)) FROM EMP;
```

## 7.3、avg

取得某一列的平均值

- 取得平均薪水

```sql
SELECT avg(SAL) FROM EMP;
```

## 7.4、max

取得某个一列的最大值

- 取得最高薪水

```sql
SELECT max(SAL) FROM EMP;
```

- 取得最晚入职得员工

```sql
 SELECT max(str_to_date (hiredate, '%Y-%m-%d')) FROM EMP;
```

## 7.5、min

取得某个一列的最小值

- 取得最低薪水

```sql
SELECT min(SAL) FROM EMP;
```

- 取得最早入职得员工（可以不使用 str_to_date 转换）

```sql
 SELECT min(str_to_date (hiredate, '%Y-%m-%d')) FROM EMP;
```

## 7.6、组合聚合函数

可以将这些聚合函数都放到 SELECT 中一起使用

```sql
SELECT count(*),sum(SAL),avg(SAL),max(SAL),min(SAL) FROM EMP;
```

# 8、分组查询

分组查询主要涉及到两个子句，分别是：group by 和 having

## 8.1、group by

- 取得每个工作岗位的工资合计，要求显示岗位名称和工资合计

  ```sql
  SELECT JOB,SUM(SAL) FROM EMP GROUP BY JOB;
  ```

  如果使用了order by，order by 必须放到 group by 后面

- 按照工作岗位和部门编码分组，取得的工资合计

    ```sql
    SELECT JOB,DEPTNO,sum(SAL) FROM EMP GROUP BY JOB,DEPTNO;
    ```

  ::: danger 重点

    ```sql
    SELECT JOB,DEPTNO,sum(SAL) FROM EMP GROUP BY JOB,DEPTNO;
    ```

  以上 SQL 语句在 Oracle 数据库中无法执行，执行报错。

  以上 SQL 语句在 Mysql 数据库中可以执行，但是执行结果矛盾。

  在 SQL 语句中若有 group by 语句，那么在 SELECT 语句后面只能跟 **分组函数+参与分组的字段**。

  :::



## 8.2、having

如果想对分组数据再进行过滤需要使用 having 子句

取得每个岗位的平均工资大于 2000

```sql
 SELECT JOB,avg(SAL) FROM EMP GROUP BY JOB HAVING avg(SAL) > 2000;
```

::: note 分组函数的执行顺序：

根据条件查询数据

分组

采用 having 过滤，取得正确的数据

:::

## 8.3、select语句总结

一个完整的 SELECT 语句格式如下

```sql
select 字段 5
from 表名         1
where            2
group by         3
having (就是为了过滤分组后的数据而存在的—不可以单独的出现) 4
order by  6
```

以上语句的执行顺序

1.  指定需要查询的表

2.  首先执行 where 语句过滤原始数据

3.  执行 group by 进行分组

4.  执行 having 对分组数据进行操作

5.  执行 select 选出数据

6.  执行 order by 排序

::: note 原则：

能在 where 中过滤的数据，尽量在 where 中过滤，效率较高。having 的过滤是专门对分组之后的数据进行过滤的。

:::