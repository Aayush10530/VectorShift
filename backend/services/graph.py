# backend/services/graph.py

def build_adjacency(edges: list) -> dict[str, list[str]]:
    adjacency = {}
    for edge in edges:
        source = edge.source
        target = edge.target
        if source not in adjacency:
            adjacency[source] = []
        adjacency[source].append(target)
    return adjacency

def has_cycle(adjacency: dict[str, list[str]], node_ids: list[str]) -> bool:
    visited = set()
    visiting = set()

    def dfs(node: str) -> bool:
        if node in visiting:
            return True  # cycle found
        if node in visited:
            return False
        visiting.add(node)
        for neighbor in adjacency.get(node, []):
            if dfs(neighbor):
                return True
        visiting.remove(node)
        visited.add(node)
        return False

    for node_id in node_ids:
        if node_id not in visited:
            if dfs(node_id):
                return True
    return False

def analyze_pipeline(nodes: list, edges: list) -> dict:
    num_nodes = len(nodes)
    num_edges = len(edges)
    node_ids = [n.id for n in nodes]
    adjacency = build_adjacency(edges)
    is_dag = not has_cycle(adjacency, node_ids)
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

# build_adjacency([edge(A→B), edge(B→C)]) → {'A': ['B'], 'B': ['C']}
# has_cycle({'A': ['B'], 'B': ['C']}, ['A','B','C']) → False
# has_cycle({'A': ['B'], 'B': ['C'], 'C': ['A']}, ['A','B','C']) → True
# analyze_pipeline(1 node, 0 edges) → {num_nodes:1, num_edges:0, is_dag:True}
