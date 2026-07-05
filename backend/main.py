from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.pipeline import PipelineModel, PipelineResponse
from services.graph import analyze_pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineModel):
    result = analyze_pipeline(pipeline.nodes, pipeline.edges)
    return PipelineResponse(**result)
