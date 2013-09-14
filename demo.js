// var sort = require('toposort').array;

module.exports = Graph;

/**
 * Graph class
 *
 * @param {Array} [nodes]
 * @param {Array} [edges]
 */

function Graph(nodes, edges){
	this.nodes = nodes || [];
	this.edges = edges || [];
}

/**
 * add `node` if not already in the graph
 *
 * @param {Any} node
 * @return {this}
 * @api public
 */

Graph.prototype.addNode = function(node){
	if (this.nodes.indexOf(node) < 0) {
		this.nodes.push(node);
	}
	return this;
}

/**
 * add two nodes with a relationship
 *
 * @param {Any} from
 * @param {Any} to
 * @return {this}
 * @api public
 */

Graph.prototype.addEdge = function(from, to){
	this.addNode(from);
	this.addNode(to);
	this.edges.push([from, to]);
	return this;
}

/**
 * add a relationship between two existing nodes
 *
 * @param {Any} from
 * @param {Any} to
 * @return {this}
 * @api public
 */

Graph.prototype.addRelationship = function(from, to){
	this.edges.push([from, to]);
	return this;
}

/**
 * convert to a topologically sorted array
 *
 * @return {Array}
 * @api public
 */

Graph.prototype.toArray = function(){
	return sort(this.nodes, this.edges);
}

/**
 * clone this Graph
 *
 * @return {Graph}
 * @api public
 */

Graph.prototype.clone = function(){
	return new Graph(
		this.nodes.slice(),
		this.edges.slice());
}