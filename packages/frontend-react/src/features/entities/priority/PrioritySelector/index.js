import { withLabel } from "@src/shared/lib/hocs/withLabel/withLabel";
import PrioritySelector from "./ui/PrioritySelector";

const PrioritySelectorWIthLabel = withLabel(PrioritySelector,'PrioritySelector')

export {PrioritySelector,PrioritySelectorWIthLabel}