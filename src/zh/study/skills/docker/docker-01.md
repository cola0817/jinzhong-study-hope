---
title: Docker 入门
icon: https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/docker.svg
category:
  - 动力节点
  - Docker
---
# 一、Docker 入门

## 1.1 Docker 是什么

> 正如 [Docker 官网](https://www.docker.com/) 中写着 Docker 的宣传语 ==**Develop faster.** Run anywhere.== 所描述的，使用 Docker 我们可以更快的进行开发，并随处运行。且截至 2022 Docker 在 `Stack Overflow` 中备受好评「The most-loved Tool in Stack Overflow’s 2022 Developer Survey」。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416081218.png)

### 1.1.1 Docker 出现的背景

假定您在开发一个大型项目，您使用的是一台笔记本电脑而且您的开发环境具有特定的配置。

- 其他开发人员身处的环境配置也各有不同。您正在开发的应用依赖于您当前的配置且还要依赖于某些配置文件。
- 此外，您的企业还拥有标准化的测试和生产环境，且具有自身的配置和一系列支持文件。

您希望尽可能多在本地模拟这些环境而不产生重新创建服务器环境的开销。请问？您要如何确保应用能够在这些环境中运行和通过质量检测？并且在部署过程中不出现令人头疼的版本、配置问题，也无需重新编写代码和进行故障修复？

---
答案就是使用容器。Docker之所以发展如此迅速，也是因为它对此给出了一个标准化的解决方案：==系统平滑移植，容器虚拟化技术==。 以前我们在进行开发的时候，环境配置相当麻烦，换一台机器，就要重来一次，费力费时。很多人想到，能不能从根本上解决问题，软件可以带环境安装？也就是说，安装的时候，把原始环境一模一样地复制过来。==开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题==。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416081802.png)


之前在服务器配置一个应用的运行环境，要安装各种软件，安装和配置这些东西有多麻烦就不说了，它还不能跨平台。假如我们是在 Windows 上安装的这些环境，到了 Linux 又得重新装。况且就算不跨操作系统，换另一台同样操作系统的服务器，要**移植**应用也是非常麻烦的。

传统上认为:
- 软件编码开发/测试结束后，所产出的成果即是程序或是能够编译执行的二进制字节码等(Java 为例)。
- 而为了让这些程序可以顺利执行，开发团队也得准备完整的部署文件，让维运团队得以部署应用程式，开发需要清楚的告诉运维部署团队，用的全部配置文件 + 所有软件环境。
- 不过，即便如此，仍然常常发生部署失败的状况。Docker 的出现使得 Docker 得以打破过去==「程序即应用」==的观念。透过镜像 (images) 将作业系统核心除外，运作应用程式所需要的系统环境，由下而上打包，达到应用程式跨平台间的无缝接轨运作。

### 1.1.2 Docker Docker 的理念

> Docker是基于Go语言实现的云开源项目。
>
> Docker的主要目标是==『Build，Ship and Run Any App,Anywhere』==，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到==『一次镜像，处处运行』==。


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082005.png)


> Linux容器技术的出现就解决了这样一个问题，而 Docker 就是在它的基础上发展过来的。将应用打成镜像，通过镜像成为运行在Docker容器上面的实例，而 Docker容器在任何操作系统上都是一致的，这就实现了==跨平台、跨服务器==。只需要一次配置好环境，换到别的机子上就可以一键部署好，大大简化了操作，从而解决了运行环境和配置问题的软件容器， 方便做持续集成并有助于整体发布的容器虚拟化技术。

### 1.1.3 Docker 容器与传统虚拟机的区别

> Docker 容器发展历程：

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082059.png)

> Docker 容器虚拟化技术：
>
> 由于虚拟机存在某些缺点，Linux发展出了另一种虚拟化技术：`Linux容器(Linux Containers，缩写为 LXC)`

- Linux容器是与系统其他部分隔离开的一系列进程，从另一个镜像运行，并由该镜像提供支持进程所需的全部文件。
- 容器提供的镜像包含了应用的所有依赖项，因而在从开发到测试再到生产的整个过程中，它都具有可移植性和一致性。

有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。==容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置==。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082221.png)

`虚拟机（virtual machine）`就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows10系统里面运行Linux系统CentOS7。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使==应用程序，操作系统和硬件三者之间的逻辑不变==。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082312.png)

* 传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；
* 容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。
* 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。

## 1.2 Docker 能干吗

> Dcoker 可以加快构建、共享和运行现代应用程序的速度。


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082401.png)


> ==Docker 可以使得开发变得高效且可预测==
>
> Docker 消除了重复、平凡的配置任务，并在整个开发生命周期中用于快速、轻松和可移植的应用程序开发——桌面和云。 Docker 全面的端到端平台包括 UI、CLI、API 和安全性，它们被设计为在整个应用程序交付生命周期中协同工作。


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082439.png)


### 1.2.1 Build

> - 通过利用 Docker 映像在 Windows 和 Mac 上高效开发您自己独特的应用程序，抢先开始编码。 使用 Docker Compose 创建您的多容器应用程序。
> - 在整个开发管道中与您最喜欢的工具集成——Docker 可与您使用的所有开发工具配合使用，包括 VS Code、CircleCI 和 GitHub。
> - 将应用程序打包为可移植容器映像，以便在从本地 Kubernetes 到 AWS ECS、Azure ACI、Google GKE 等的任何环境中一致地运行。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082502.png)


### 1.2.2 Share

> - 利用 Docker 可信内容，包括 Docker 官方图像和来自 Docker Hub 存储库的 Docker 验证发布者的图像。
> - 通过与团队成员和其他开发人员协作以及通过轻松将图像发布到 Docker Hub 来进行创新。
> - 使用基于角色的访问控制个性化开发人员对图像的访问，并使用 Docker Hub 审计日志深入了解活动历史记录。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082515.png)

### 1.2.3 Run

> - 轻松交付多个应用程序，并让它们在您的所有环境中以相同的方式运行，包括设计、测试、暂存和生产——桌面或云原生。
> - 将您的应用程序以不同的语言独立部署在单独的容器中。 降低语言、库或框架之间发生冲突的风险。
> - 借助 Docker Compose CLI 的简单性和一条命令加速开发，在本地启动您的应用程序，并使用 AWS ECS 和 Azure ACI 在云上启动您的应用程序。


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082529.png)


### 1.2.4 更简单的系统运维

> 应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

### 1.2.5 更高效的计算资源利用

> ==Docker是内核级虚拟化==，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。

## 1.3 Docker 的基本组成

> Docker 是一个 Client-Server 结构的系统，Docker 守护进程运行在主机上， 然后通过Socket 连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器。

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082609.png)

## 1.4 Docker 相关概念

Docker 常见的概念有：

- 镜像（Image）
- 容器（Container）
- 镜像文件
- 容器实例
- 仓库

> Docker 镜像（Image）就是一个**只读**的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。
>
> 它也相当于是一个root文件系统。比如官方镜像 centos:7 就包含了完整的一套 centos:7 最小系统的 root 文件系统。
>
> 相当于容器的“源代码”，docker 镜像文件类似于 Java 的类模板，而 docker 容器实例类似于java 中 new 出来的实例对象。

| Docker | 面向对象 |
| ------ | -------- |
| 镜像   | 类       |
| 容器   | 对象     |

> Docker 利用容器（Container）独立运行的一个或一组应用，应用程序或服务运行在容器里面，容器就类似于一个虚拟化的运行环境，容器是用镜像创建的运行实例。就像是Java中的类和实例对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器为镜像提供了一个标准的和隔离的运行环境，它可以被启动、开始、停止、删除。每个容器都是相互隔离的、保证安全的平台。可以把容器看做是一个简易版的Linux环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。

仓库（Repository）是集中存放镜像文件的场所。类似于：

- Maven仓库，存放各种jar包的地方
- github仓库，存放各种git项目的地方

> Docker公司提供的官方registry被称为Docker Hub，存放各种镜像模板的地方。
>

仓库分为：

- 公开仓库（Public）
- 私有仓库（Private）

> 最大的公开仓库是 [DockerHub](https://hub.docker.com/)，存放了数量庞大的镜像供用户下载。国内的公开仓库包括阿里云 、网易云等

- Docker 本身是一个容器运行载体或称之为管理引擎。我们把应用程序和配置依赖打包好形成一个可交付的运行环境，这个打包好的运行环境就是 image 镜像文件。只有通过这个镜像文件才能生成 Docker 容器实例(类似 Java 中 new 出来一个对象)。
- image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。
- 镜像文件: image 文件生成的容器实例，本身也是一个文件，称为镜像文件。
- 容器实例：一个容器运行一种服务，当我们需要的时候，就可以通过 docker 客户端创建一个对应的运行实例，也就是我们的容器仓库

## 1.5 Hello Docker

> 当我们执行  `docker run hello-world` 时：

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416082956.png)

> Docker 基本流程


![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416083008.png)




# 二、在 CentOS7  中安装 docker

## 2.1 前置环境的安装

> 使用 `cat /etc/redhat-release` 查看当前系统内核是否满足条件
>
> 目前，CentOS 仅发行版本中的内核支持 Docker。Docker 运行在CentOS 7 (64-bit)上，
>
> 要求系统为64位、Linux系统内核版本为 3.8以上，这里选用Centos7.x

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085202.png)

1. 安装 `sudo yum install -y yum-utils`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085210.png)

2. 安装 `yum -y install gcc`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085219.png)

3. 安装 `yum -y install gcc-c++`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085229.png)

## 2.2 设置stable镜像仓库

```shell
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085251.png)


1. 刷新 `yum makecache fast`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085311.png)

## 2.3 安装 docker CE

1. 安装 `yum -y install docker-ce docker-ce-cli containerd.io`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085319.png)

## 2.4 验证 docker

1. 启动 `systemctl start docker`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085335.png)

2. 此处我们可以将 docker 设置为开机自启 `systemctl enable docker`

3. 测试 `docker version`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085354.png)

4. HelloDocker `docker run hello-world`

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085406.png)

## 2.5 配置阿里云镜像加速

> 配置阿里云镜像加速 [容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085419.png)

1. 回退 `cd ~`

2. 执行脚本 ==此处需要申请自己的加速地址==

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["xxx"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

![](https://cola-picgo-1311841992.cos.ap-beijing.myqcloud.com/20230416085440.png)
