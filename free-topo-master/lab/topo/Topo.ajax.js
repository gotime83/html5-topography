/**
 * Copyright [2012] [free-topo copyright npc]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law
 * or agreed to in writing, software distributed under the License is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
if (typeof (Topo) == "undefined")
	Topo = {};
/**
 * 封装了Ajax的方法
 * 
 * @author bugu
 */
Topo.ajax = (function() {
	/**
	 * TODO - param 需要序列化
	 */
	this.request = function(url, param , successHandler, failHandler) {
		var xmlHttp;
		if (typeof XMLHttpRequest != "undefined") {
			xmlHttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			var aVersions = [ "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0",
					"Msxml2.XMLHttp.3.0", "Msxml2.XMLHttp", "Microsoft.XMLHttp" ];
			for ( var i = 0; i < aVersions.length; i++) {
				try {
					xmlHttp = new ActiveXObject(aVersions[i]);
					break;
				} catch (e) {
				}
			}
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var json = xmlhttp.responseText;
				try{
					var param = eval(json);
				}catch(e){
					failHandler({
						readyState 	: xmlhttp.readyState ,
						status 		: xmlhttp.status,
						exception	: e
					});
					return;
				}
				successHandler(param);
			}else{
				failHandler({ 
					readyState 	: xmlhttp.readyState ,
					status 		: xmlhttp.status
				});
			}
		}
		xmlHttp.open("GET", url, true);
		xmlHttp.send();
	};

	return this;
})();