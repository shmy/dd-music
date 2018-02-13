package shmy

import (
	"log"
	"os"
	"io"
	"bytes"
	"archive/zip"
	"path/filepath"
	// "github.com/axgle/mahonia"
	"github.com/cheggaaa/pb"
)


// 解压zip
func UnZip(archive, target string) error {
	log.Printf("[INFO] 正在解压补丁包: [%s]", archive)
	reader, err := zip.OpenReader(archive)
	if err != nil {
    return err
	}

	if err := os.MkdirAll(target, 0755); err != nil {
		return err
	}

	count := len(reader.File)
	bar := pb.StartNew(count)
	for _, file := range reader.File {
		path := filepath.Join(target, file.Name)
		// 转码中文GBK
		// enc:=mahonia.NewDecoder("GBK")
		// 将gbk编码转为utf-8
		// path = enc.ConvertString(path)
		// fmt.Println(path)
		if file.FileInfo().IsDir() {
			os.MkdirAll(path, file.Mode())
			bar.Increment()
			continue
		}

		fileReader, err := file.Open()
		if err != nil {
			return err
		}
		defer fileReader.Close()

		targetFile, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			return err
		}
		defer targetFile.Close()

		if _, err := io.Copy(targetFile, fileReader); err != nil {
			return err
		}
		bar.Increment()
	}
	defer reader.Close()
	bar.Finish()
	log.Printf("[INFO] 补丁包解压完成: [%s]", archive)
	return nil
}
// 判断是否是Zip文件
func IsZip(zipPath string) bool {
	f, err := os.Open(zipPath)
	if err != nil {
		return false
	}
	defer f.Close()

	buf := make([]byte, 4)
	if n, err := f.Read(buf); err != nil || n < 4 {
		return false
	}

	return bytes.Equal(buf, []byte("PK\x03\x04"))
}
