let uri = this.serverHost;
    if (this.loadDataUri) {
      uri += this.loadDataUri;
    } else {
      uri += '/api/dev/main/v1.0/qdpsearch/export';
    }
    axios({ // 用axios发送post请求
        method: 'post',
        url: uri, // 请求地址
        data: params, // 参数
        responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
      })
        .then((res) => { // 处理返回的文件流
          const content = res;
          const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          const fileName = params.queryId + '.xls';
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
      });