import { compose } from "@reduxjs/toolkit";
import { makeColumns } from "./lib/makeColumns";
import { makeData } from "./lib/makeData";
import { withProvider } from "./lib/withProvider";
import Table from "./ui/Table";

const BaseTable = compose(withProvider,makeData,makeColumns)(Table,'Table')

export {BaseTable}