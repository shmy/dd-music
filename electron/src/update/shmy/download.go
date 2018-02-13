package shmy

import (
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"github.com/cheggaaa/pb"
)

/**
* 下载指定文件
**/
func Download(url string, filename string) bool {
	res, err := http.Get(url)
	if err != nil {
    panic(err)
    PauseToExit()
	}
	if res.StatusCode == http.StatusOK {
		log.Printf("[INFO] 正在下载补丁包: [%s]", url)
		f, _ := os.Create(filename)

		i, _ := strconv.Atoi(res.Header.Get("Content-Length"))
		sourceSiz := int64(i)
		source := res.Body
		bar := pb.New(int(sourceSiz)).SetUnits(pb.U_BYTES).SetRefreshRate(time.Millisecond * 10)
		bar.Start()

		bar.ShowSpeed = true
		bar.ShowFinalTime = true
		writer := io.MultiWriter(f, bar)

		io.Copy(writer, source)
		f.Close() // 关闭文件
		bar.Finish()
		log.Printf("[INFO] 补丁包下载完成: [%s]", url)
		return true
	} else {
		log.Printf("[ERROR] HTTP状态码返回 [%d]: [%s]", res.StatusCode, url)
		return false
	}
}
