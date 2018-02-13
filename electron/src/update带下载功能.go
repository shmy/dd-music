package test

import (
	"flag"
	"log"
	"path/filepath"
	"time"
	// "os"
	shmy "./shmy"
)

var (
	tmpName string = filepath.Join(shmy.GetCurrentPath(), "./archive.zip")
	appName string = "./bin"
	exeName string = "dd-music.exe"
)

func main() {
	shmy.Logo()
	pid := flag.String("pid", "", "进程ID")
	url := flag.String("url", "", "文件URL")
	dir := flag.String("dir", filepath.Join(shmy.GetCurrentPath(), appName), "程序目录")
	flag.Parse()

	if *url == "" {
		log.Printf("[ERROR] URL地址必须填写")
		shmy.PauseToExit()
		return
	}
	if *pid == "" {
		log.Printf("[INFO] 正在初始化中")
		// 等待3秒
		time.Sleep(3 * time.Second)
		log.Printf("[INFO] 初始化完毕")
	} else {
		shmy.KillByPid(*pid)
	}

	if !shmy.Download(*url, tmpName) {
		shmy.PauseToExit()
		return
	}
	if !shmy.IsZip(tmpName) {
		log.Printf("[ERROR] 补丁包不是一个ZIP文件")
		shmy.PauseToExit()
		return
	}
	err := shmy.UnZip(tmpName, *dir)
	if err != nil {
		log.Printf("[ERROR] 解压缩过程发生错误:\n[%s]", err.Error())
		panic(err)
		shmy.PauseToExit()
		return
	}
	shmy.UnLink(tmpName)
	execPath := filepath.Join(*dir, exeName)
	log.Printf("[INFO] 正在重新启动应用")
	shmy.Launch(execPath)
}
