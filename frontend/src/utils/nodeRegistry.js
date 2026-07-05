// frontend/src/utils/nodeRegistry.js

import { InputNode } from '../nodes/inputNode';
import { OutputNode } from '../nodes/outputNode';
import { LLMNode } from '../nodes/llmNode';
import { TextNode } from '../nodes/textNode';

import { PromptCrafterNode } from '../nodes/custom/PromptCrafterNode';
import { FilterNode } from '../nodes/custom/FilterNode';
import { TransformNode } from '../nodes/custom/TransformNode';
import { APICallNode } from '../nodes/custom/APICallNode';
import { MergeNode } from '../nodes/custom/MergeNode';

export const NODE_TYPES = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  promptCrafter: PromptCrafterNode,
  filter: FilterNode,
  transform: TransformNode,
  apiCall: APICallNode,
  merge: MergeNode,
};

export default NODE_TYPES;
