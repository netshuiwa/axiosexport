let uri = this.serverHost;
    if (this.loadDataUri) {
      uri += this.loadDataUri;
    } else {
      uri += '/api/dev/main/v1.0/qdpsearch/export';
    }
    axios({ // ��axios����post����
        method: 'post',
        url: uri, // �����ַ
        data: params, // ����
        responseType: 'arraybuffer' // �������ط��������ص���������
      })
        .then((res) => { // �����ص��ļ���
          const content = res;
          const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
          const fileName = params.queryId + '.xls';
          if ('download' in document.createElement('a')) { // ��IE����
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // �ͷ�URL ����
            document.body.removeChild(elink);
          } else { // IE10+����
            navigator.msSaveBlob(blob, fileName);
          }
      });