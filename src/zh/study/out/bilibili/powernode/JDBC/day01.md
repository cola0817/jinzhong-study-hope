---
title: JDBC 基础
icon: https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/jdbc.svg
category:
  - 动力节点
  - JDBC
---
# JDBC 基础

## 一、JDBC 概述

###  1.1 JDBC 是什么

Java DataBase Connectivity（Java 数据库连接）

### 1.2 JDBC 的本质

::: tip JDBC 的本质

JDBC 是 SUN 公司制定的一套接口（interface）其本质为接口.

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230819151224.png)

:::

`java.sql.*` (这个软件包下有很多接口。)

接口都有调用者和实现者。
面向接口调用、面向接口写实现类，这都属于面向接口编程。

::: note 为什么要面向接口编程？

- 解耦合：降低程序的耦合度，提高程序的扩展力。

  多态机制就是非常典型的：面向抽象编程。（不要面向具体编程）


  ```java
  // 建议：
  	Animal a = new Cat();
  	Animal a = new Dog();
  	// 喂养的方法
  	public void feed(Animal a){ // 面向父类型编程。
  }
  //不建议：
  	Dog d = new Dog();
  	Cat c = new Cat();
  ```

:::
::: tip 为什么SUN制定一套JDBC接口呢？

因为每一个数据库的底层实现原理都不一样。
- `Oracle` 数据库有自己的原理。
- `MySQL` 数据库也有自己的原理。
- `MS SqlServer` 数据库也有自己的原理。
  ....
  每一个数据库产品都有自己独特的实现原理。

:::

### 1.3 JDBC jar 包的配置

JDBC 开发前的准备工作，先从官网下载对应的驱动 `jar `包，然后将其配置到环境变量 `classpath `当中。

- 使用系统环境变量进行配置 （针对于使用记事本等开发工具）

```properties
classpath=.;D:\course\06-JDBC\resources\MySql Connector Java 5.1.23\mysql-connector-java-5.1.23-bin.jar
```

::: danger 重点

`classpath` 中的 `.;`

- `.` 代表当前目录
- `;` 表示分隔符

如果没有 `.` 在进行编译的时候会找不到当前路径下的 `Java` 文件

:::

- 使用集成开发环境 IDEA 开发

使用 IDEA 工具的时候，不需要配置以上的环境变量。IDEA 有自己的配置方式，只需要对指定模块导入库即可。

![](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/20230819171034.png)

![image-20230819171052932](https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/image-20230819171052932.png)

### 1.4 JDBC 编程六步

1. 注册驱动（作用：告诉 Java 程序，即将要连接的是哪个品牌的数据库）
2. 获取连接（表示 JVM 的进程和数据库进程之间的通道打开了，这属于进程之间的通信，重量级的，使用完之后一定要关闭通道。）
3. 获取数据库操作对象（专门执行 sql 语句的对象）
4. 执行 SQL 语句（DQL DML....）
5. 处理查询结果集（只有当第四步执行的是 select 语句的时候，才有这第五步处理查询结果集。）
6. 释放资源（使用完资源之后一定要关闭资源。Java 和数据库属于进程间的通信，开启之后一定要关闭。）

## 二、模拟 JDBC 的本质

::: tip 本质

`JDBC` 的本质为一套接口，其优点有

- 降低程序的耦合性
- 提高程序的扩展性

对于 `JDBC` 同样如此，对于不用的数据库实现我们只需要关心最顶层的 `JDBC` 接口即面向接口编程而无需过多的关注具体的实现（具体的实现由各数据库厂商提供）。

:::

例子：

- `SUN` 公司制定的 `JDBC` 接口

```java
/**
 * Sun 负责制定该接口
 */
public interface JDBC {
    /**
     * 连接数据库
     */
    void getConnect();
}
```

- 各数据库厂商实现该接口

```java
public class JDBCMySQL implements JDBC {
    @Override
    public void getConnect() {
        System.out.println("成功连接到 MySQL 数据库");
    }
}
```

```java
public class JDBCOracle implements JDBC {
    @Override
    public void getConnect() {
        System.out.println("成功连接到 Oracle 数据库");
    }
}
```

```java
public class JDBCSqlServer implements JDBC {
    @Override
    public void getConnect() {
        System.out.println("成功连接到 sqlServer 数据库");

    }
}
```

- 程序员只需要面向接口即可

```java
/**
 * 程序员只需要选择对应的驱动即可无需关心驱动的具体实现 （面向接口编程）
 */
public class Cola {
    public static void main(String[] args) {

        JDBC mysql = new JDBCMySQL();
        mysql.getConnect();

        JDBC oracle = new JDBCOracle();
        oracle.getConnect();

        JDBC sqlServer = new JDBCSqlServer();
        sqlServer.getConnect();

    }
}
```

::: note 使用 `properties` 文件配置参数

我们可以通过反射的原理直接通过 类名 加载类

```java
public class ColaByRef {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {

        /*
         用 ResourceBundle 资源绑定器绑定 xxx.properties 文件时，文件只能在类路径（即 src)下。
         */
        ResourceBundle bundle = ResourceBundle.getBundle("jdbc");

        String className = bundle.getString("className");
        Class<?> aClass = Class.forName(className);

        JDBC driver = (JDBC) aClass.newInstance();

        driver.getConnect();

    }
}
```

::: danger 重点

用 ResourceBundle 资源绑定器绑定 xxx.properties 文件时，文件只能在类路径（即 src)下。

:::

:::

## 三、JDBC 的基本使用

```java
public class InitJDBC {
    public static void main(String[] args) throws SQLException {

        Connection connection = null;
        Statement statement = null;

        try {
            //1. 注册驱动
            Driver driver = new com.mysql.jdbc.Driver();
            DriverManager.registerDriver(driver);

            //2. 获取连接
            String url = "jdbc:mysql://8.130.21.128:3307/mysql";
            String user = "root";
            String password = "root";
            connection = DriverManager.getConnection(url, user, password);

            //3. 获取数据库操作对象
            statement = connection.createStatement();

            //4. 执行 SQL 语句
            String sql = "SELECT * FROM mysql.db";
            ResultSet resultSet = statement.executeQuery(sql);

            // 5.处理查询结果集
            while (resultSet.next()) {
                System.out.println(resultSet.getString("host"));
            }

        }catch (SQLException sqlException){
            sqlException.printStackTrace();
        }finally {
            // 6. 关闭资源
            try {
                if (statement != null) {
                    statement.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }
            try {
                if (connection != null) {
                    connection.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }
        }


    }
}
```



### 3.1 使用 JDBC 执行 DML 语句

```java
public class JDBCDML {
    public static void main(String[] args){
        Connection connection = null;
        Statement statement = null;

        try {

            ResourceBundle bundle = ResourceBundle.getBundle("jdbc");

            String driver = bundle.getString("driver");
            String url = bundle.getString("url");
            String user = bundle.getString("user");
            String password = bundle.getString("password");


            Class.forName(driver);

            connection = DriverManager.getConnection(url, user, password);

            statement = connection.createStatement();

            String sql = "INSERT INTO test(user,host,age) VALUES ('cola','127.0.0.1',21)";
            int count = statement.executeUpdate(sql);
            System.out.println("result "+(count == 1?"插入成功":"插入失败"));

            String select_sql = "SELECT * FROM test";
            ResultSet resultSet = statement.executeQuery(select_sql);
            while (resultSet.next()){
                System.out.println(
                        resultSet.getString("host")+
                        resultSet.getString("user")+
                         resultSet.getString("age"));

            }

        }catch (SQLException sqlException){
            sqlException.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {

            try {
                if (statement != null) {
                    statement.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }

            try {
                if (connection != null) {
                    connection.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }
        }
    }
}

```



### 3.2 使用 JDBC 执行 DQL 语句

```java
public class JDBCDQL {
    public static void main(String[] args) {

        Connection connection = null;
        Statement statement = null;

        try {

            ResourceBundle bundle = ResourceBundle.getBundle("jdbc");

            String driver = bundle.getString("driver");
            String url = bundle.getString("url");
            String user = bundle.getString("user");
            String password = bundle.getString("password");

            Class.forName(driver);

            connection = DriverManager.getConnection(url, user, password);

            statement = connection.createStatement();

            String sql = "SELECT host FROM mysql.test";
            ResultSet resultSet = statement.executeQuery(sql);

            while (resultSet.next()){
                System.out.println(resultSet.getString("host"));
            }


        }catch (SQLException sqlException){
            sqlException.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }
            try {
                if (connection != null) {
                    connection.close();
                }
            }catch (SQLException sqlException){
                sqlException.printStackTrace();
            }
        }

    }
}
```

