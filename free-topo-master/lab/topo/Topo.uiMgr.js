/**
 * Copyright [2012] [free-topo copyright npc]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 		http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if (typeof (Topo) == "undefined")
	Topo = {};
Topo.uiMgr = (function(){
	var uimap = {
			"network.ui" 	: "Topo.network.canvas.ui" ,
			"node.ui"		: "Topo.node.canvas.ui" ,
			"link.ui"		: "Topo.link.canvas.ui" ,
			"alarm.ui"		: "Topo.alarm.canvas.ui"
	};
	return new function(){
		
		this.getUIs = function(){
			return uimap;
		};
		
		this.getUI = function(key){
			return uimap[key];
		};
		
		this.setUI = function(key , value){
			uimap[key] = value;
		};
		
	}
})();