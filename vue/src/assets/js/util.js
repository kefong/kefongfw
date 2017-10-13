var util = {
		debug: function(str)
		{
			console.log(str);
		},
		/**
		 * 判断字符串是否为空
		 * @param str
		 * @returns
		 */
		empty:function(str)
		{
			return typeof(str) == 'undefined' || str == null || str == undefined || str == '';
		},
		/**
		 * 设置或读取缓存
		 * @param name
		 * @param value
		 * @returns
		 */
		cache:function(name, value)
		{
			//读取
			if(typeof(value) == 'undefined')
			{
				//获取value
				var value = localStorage.getItem(name);
				//value是否为json字符串
				if(this.isJsonString(value))
				{
					//是则转换为json对象
					return JSON.parse(value);
				}
				else
				{
					//不是json则，直接原数据
    				return value;
				}
			}
			//删除
			else if(value === null)
			{
				localStorage.removeItem(name);
			}
			//赋值
			else//如果value有值
			{
				//如果value是object
				if(value instanceof Object)
				{
					value = JSON.stringify(value);//转换为字符串再存
				}    				
				localStorage.setItem(name,value);
				return;
			}
		},
		/**
		 * 判断字符串是否为json
		 * @param str
		 */
		isJsonString:function(str)
		{
			if(this.empty(str))
			{
				return false;
			}
			else
			{
				if(str.charAt(str.length-1) == '}' && str.indexOf('{') == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			
		},
		cookie:function(name, value, expiresTime){
			var prefix = 'vue_';
			name = prefix + name;
			//读取
			if(typeof(value) == 'undefined')
			{
				if(document.cookie.length > 0)
				{
					var intStart;
					var intEnd;
					//获取开始位置
					var intStart = document.cookie.indexOf(name + '=');
					//如果存在
					if(intStart > -1)
					{
						intStart = intStart + name.length + 1;    						
						intEnd = document.cookie.indexOf(';', intStart);
						if(intEnd == -1)
						{
							intEnd = document.cookie.length;
						}
						return unescape(document.cookie.substring(intStart, intEnd));
					}
				}
				return null;
			}
			//删除
			else if(value === null)
			{
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var value = this.cookie(name);
				if(value != null)
				{
					document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
				}    				
			}
			//赋值
			else//如果value有值
			{
				//如果value是object
				if(value instanceof Object)
				{
					value = JSON.stringify(value);//转换为字符串再存
				}    				

				if(!this.empty(expiresTime)){
    				var exp = new Date();
    				exp.setTime(exp.getTime() + expiresTime * 1000);    				
    				var tmpExpires = 'expires=' + exp.toGMTString();
				}    				
				document.cookie = name + "="+ escape(value) + ';' + tmpExpires;    				
				return;
			}
		},
		// 获取多少天之内的时间段（前后两个数据）
		getDateBlock: function(days) {
			var nowDate = new Date();
			var date1 = new Date();
			date1.setDate(date1.getDate() - (days/2));
			var data1Month = date1.getMonth() + 1;
			
			var date2 = new Date();
			date2.setDate(date2.getDate() + (days/2));
			var data2Month = date2.getMonth() + 1;
			
			
			return [
				date1.getFullYear() + '-' + this.getFixedLengthText(date1.getMonth() + 1) + '-' + date1.getDate(),
				date2.getFullYear() + '-' + this.getFixedLengthText(date2.getMonth() + 1) + '-' + date2.getDate()
			];
		},
		getFixedLengthText: function(str, len, prefix){
			str = str + '';
			prefix = this.empty(prefix)?'0':prefix;
			len = this.empty(len)?2:len;			
			len = str.length - len;
			console.log(len);
			if(len >= 0){
				return str;
			}
			
			for(var i = len; i<0; i++){
				str = prefix + str;
			}
			return str;
		}
}

//module.exports = util;
export default util;