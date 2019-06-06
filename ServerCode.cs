[HttpPost("export")]
        public IActionResult Export([FromBody] Param param)
        {
            //MemoryStream获取可以通过两种方式
            //方式一 通过NPOI nuget包读取文件后写入
            /*
            MemoryStream ms = new MemoryStream();
            HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream("d:/ceshi.xls", FileMode.Open, FileAccess.Read))
            {
                hssfworkbook = new HSSFWorkbook(file);
            }

            hssfworkbook.Write(ms);
            ms.Flush();
            ms.Position = 0;

            return ms;
            */
            //方式二 通过字节流转换
            using (FileStream fs = new FileStream("d:/ceshi.xls", FileMode.Open, FileAccess.Read))
            {
                int length = (int)fs.Length;
                byte[] data = new byte[length];
                fs.Position = 0;
                fs.Read(data, 0, length);
                MemoryStream ms = new MemoryStream(data);
                ms.Flush();
                ms.Position = 0;
                return File(ms, "application/vnd.ms-excel", DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls");
            }
            
        }