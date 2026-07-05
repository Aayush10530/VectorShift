# backend/models/pipeline.py

from pydantic import BaseModel

class NodeModel(BaseModel):
    id: str
    type: str
    position: dict
    data: dict

class EdgeModel(BaseModel):
    id: str
    source: str
    sourceHandle: str
    target: str
    targetHandle: str

class PipelineModel(BaseModel):
    nodes: list[NodeModel]
    edges: list[EdgeModel]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool
