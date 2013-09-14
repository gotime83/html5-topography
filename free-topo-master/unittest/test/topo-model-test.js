test("testExtend", function() {
	QUnit.equal(true, true);

	var ele = new FT.Element({
		id : 'test'
	});

	QUnit.equal(ele.id, 'test');

	var node = new FT.Node({
		id : 'node',
		label : 'baoshan1'
	});

	QUnit.equal(node.id, 'node');

	QUnit.equal(node.getId(), 'node');

	var rel = new FT.Relation({
		id : 'rel1',
		type : 'link'
	});

	QUnit.equal(rel.id, 'rel1');
	QUnit.equal(rel.type, 'link');

	var link = new FT.Link({
		id : 'link1',
		direction : 'brother'
	});

	QUnit.equal(link.id, 'link1');
	QUnit.equal(link.type, 'link');
	QUnit.equal(link.direction, 'brother');

	var model = new FT.Model({
		id : 'm1',
		type : 'unknow'
	});

	QUnit.equal(model.id, 'm1');
	QUnit.equal(model.type, 'unknow');

	var net = new FT.Network({
		id : 'net1',
		nodes : [node],
		links : [link]
	});

	QUnit.equal(net.id, 'net1');
	QUnit.equal(net.type, 'network');
	QUnit.equal(net.nodes['node'], node);
	QUnit.equal(net.links['link1'], link);

	
	
});

test('testAddElement',function(){
	var net = new FT.Network({
		id : 'net1'
	});

	
	net.addNode(node2 = new FT.Node({
		id : 'node2',
		label : 'baoshan2'
	}));
	QUnit.equal(net.nodes['node2'], node2);
	
	net.addLink(link2 = new FT.Link({
		id : 'link2'
	}));
	QUnit.equal(net.links['link2'], link2);
});

test('testEvent',function(){
	var net = new FT.Network({
		id : 'net1'
	});
	
	var success = false;
	net.on('nodeChanged', function(e){
		if(e.name == 'nodeAdded'){
			success = true;
			QUnit.equal(e.source,node3);
		}else if(e.name = 'nodeRemoved'){
			success = true;
			QUnit.equal(e.source,node3);
		}
		
	});
	
	net.addNode(node3 = new FT.Node({
		id : 'node3',
		label : 'baoshan3'
	}));
	
	QUnit.equal(success,true);
	
	success = false;
	
	net.on('linkChanged', function(e){
		if(e.name == 'linkAdded'){
			success = true;
			QUnit.equal(e.source,link3);
		}else if(e.name = 'linkRemoved'){
			success = true;
			QUnit.equal(e.source,link3);
		}
	});
	
	net.addLink(link3 = new FT.Link({
		id : 'link3'
	}));
	QUnit.equal(success,true);
	
	success = false;
	
	nodeRemoved = net.removeNode('node3');
	QUnit.equal(nodeRemoved,node3);
	QUnit.equal(success,true);
	
	QUnit.equal(net.getNodes()['node3'],undefined);
	
	success = false;
	
	linkRemoved = net.removeLink('link3');
	QUnit.equal(linkRemoved,link3);
	QUnit.equal(success,true);
	
	QUnit.equal(net.getNodes()['link3'],undefined);
	
})
