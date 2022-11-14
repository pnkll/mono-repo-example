import { withLabel } from "@src/shared/lib/hocs/withLabel/withLabel";
import SSelect from "./ui/primary/Select";

const SelectWithLabel = withLabel(SSelect)
const Select = SSelect

export {Select, SelectWithLabel} 