# mvvm

## git hooks

客户端的钩子脚本存储在Git项目目录下的 .git/hooks 文件夹内。

例子：添加 pre-commit 钩子

```
# 在 .git/hooks 目录下新建 pre-commit 钩子文件
$ touch .git/hooks/pre-commit

# 在 pre-commit 写入要执行的脚本
#!/bin/sh
$ echo 'hello cuimm~~~'

# 给 pre-commit 添加可执行权限
$ chmod 777 .git/hooks/pre-commit

# 修改文件，git commit 提交，触发 pre-commit 钩子
$ git commit -m 'test git hooks'

# 控制台打印出：hello cuimm~~~
hello cuimm~~~
[master 2949683] hooks
 1 file changed, 1 insertion(+), 1 deletion(-)
```


echo "se nu" >> ~/.vimrc





