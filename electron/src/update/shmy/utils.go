package shmy

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func Logo() {
	fmt.Println("                         D                        ")
	fmt.Println("                    :sMBBBBBGs:                   ")
	fmt.Println("                iXBBBBBBMMMBBBBBM2i               ")
	fmt.Println("           ,s9BBBBBBBBBBBBBBBBBBBBBBBhr,          ")
	fmt.Println("       isMBBBBMMGMBi   ,,irs29GMBBBBBBBBBGs:      ")
	fmt.Println("       BBBMGGGGGGGBi               MMGGGBBBB      ")
	fmt.Println("       BMGGG9G9GGMBr  rBBMG9S2sr   BMG9GGGBB      ")
	fmt.Println("       BMGG9GGGGMBBr  rBBMBBBBBB   MBGG9G9BB      ")
	fmt.Println("       BMGGGGMBBBBBs  iBGGGMMMBB   BMGGG9GMB      ")
	fmt.Println("       BM9GGMBs,      iBMGMBBBBB   BBGGGGGBB      ")
	fmt.Println("       BMG9GB,        ,BGBBs:,,:   BMG9G9GMB      ")
	fmt.Println("       BM9GGBr        SBB9         MBGG9GGBB      ")
	fmt.Println("       BMG9GGBGs:,,:sBBMMh         BGG9G9GMB      ")
	fmt.Println("       BBBMGGGBBBBBBBMMGGBGi    ,rBMGGGGMBBB      ")
	fmt.Println("       rhBBBBBMMGMGGGGGG9GBBBBBBBBMMBBBBBBhi      ")
	fmt.Println("           ,sMBBBBBGGGGGGGGGMMBBBBBBBGs,          ")
	fmt.Println("                rGBBBBBMGMGMBBBBB9i               ")
	fmt.Println("                    :sMBBBBBMs:                   ")
	fmt.Println("                         D                        ")
	fmt.Println("")
	fmt.Println("======================更新程序=====================")
	fmt.Println("")
}

/**
* 相当于暂停
**/
func PauseToExit() {
	log.Printf("[INFO] 请手动尝试重新启动应用")
	log.Printf("[INFO] 请按下任意键以关闭窗口")
	var input string
	fmt.Scanln(&input)
}

/**
* 删除
**/
func UnLink(pwd string) {
	os.RemoveAll(pwd)
}

/**
* 杀死进程
**/

func KillByPid(pid string) {
	cmd := exec.Command("taskkill", "/PID", pid, "/F", "/T")
	cmd.Start()
}

/**
* 启动指定目录的exe
**/
func Launch(exe string) {
	cmd := exec.Command(exe)
	err := cmd.Start()
	if err != nil {
		log.Fatal(err)
	}
}

/**
* 获取当前文件夹
**/
func GetCurrentPath() string {
	file, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(file)
	splitstring := strings.Split(path, "\\")
	size := len(splitstring)
	splitstring = strings.Split(path, splitstring[size-1])
	ret := strings.Replace(splitstring[0], "\\", "/", size-1)
	return ret
}
