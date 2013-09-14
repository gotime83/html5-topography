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
Topo.ns("Topo");
/**
 * 图层管理器,用于管理一个UI组件的所有图层
 * @author bugu
 */
Topo.layerMgr = (function(){
	var layers = {};
	return function(component){
		this.addLayer(index , layer){
			
		};
		
		this.removeLayer(index){
			
		};
		
		this.getLayer(index){
			
		};
		
		this.clearLayer(index){
			
		};
	}
})();

/**
 * Canvas是单图层概念，提供图层API实现多图层
 * 要求上层图层覆盖下层图层，上层图层删除下层图层绘制出来。
 * @author bugu
 */
Topo.layer = function(){
	
};