import { withLabel } from "@src/entities/priority/PriorityDisplay/hocs/withLabel";
import PriorityDisplay from "./ui/PriorityDisplay";

const PriorityDisplayWithLabel = withLabel(PriorityDisplay,'PriorityDisplay')

export {PriorityDisplay,PriorityDisplayWithLabel}