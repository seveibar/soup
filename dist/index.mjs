// src/units/index.ts
import { parseAndConvertSiUnit } from "format-si-unit";
import { z } from "zod";
import {
  parseAndConvertSiUnit as parseAndConvertSiUnit2
} from "format-si-unit";
var resistance = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "\u03A9").value);
var capacitance = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "F").value).transform((value) => {
  return Number.parseFloat(value.toPrecision(12));
});
var inductance = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "H").value);
var voltage = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "V").value);
var length = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v).value);
var frequency = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "Hz").value);
var distance = length;
var current = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v, "A").value);
var duration_ms = z.string().or(z.number()).transform((v) => parseAndConvertSiUnit(v).value);
var time = duration_ms;
var ms = duration_ms;
var timestamp = z.string().datetime();
var rotation = z.string().or(z.number()).transform((arg) => {
  if (typeof arg === "number") return arg;
  if (arg.endsWith("deg")) {
    return Number.parseFloat(arg.split("deg")[0]);
  }
  if (arg.endsWith("rad")) {
    return Number.parseFloat(arg.split("rad")[0]) * 180 / Math.PI;
  }
  return Number.parseFloat(arg);
});
var battery_capacity = z.number().or(z.string().endsWith("mAh")).transform((v) => {
  if (typeof v === "string") {
    const valString = v.replace("mAh", "");
    const num = Number.parseFloat(valString);
    if (Number.isNaN(num)) {
      throw new Error("Invalid capacity");
    }
    return num;
  }
  return v;
}).describe("Battery capacity in mAh");

// src/common/point.ts
import { z as z2 } from "zod";

// src/utils/expect-types-match.ts
var expectTypesMatch = (shouldBe) => {
};
expectTypesMatch("extra props b");
expectTypesMatch("missing props b");
expectTypesMatch(true);
expectTypesMatch("mismatched prop types: a");
var expectStringUnionsMatch = (shouldBe) => {
};
expectStringUnionsMatch(true);
expectStringUnionsMatch(
  'T1 has extra: "c", T2 has extra: "d"'
);
expectStringUnionsMatch('T1 has extra: "c"');
expectStringUnionsMatch('T2 has extra: "c"');
expectStringUnionsMatch(
  'T1 has extra: "d", T2 has extra: "c"'
);
expectStringUnionsMatch(true);

// src/common/point.ts
var point = z2.object({
  x: distance,
  y: distance
});
var position = point;
expectTypesMatch(true);
expectTypesMatch(true);

// src/common/point3.ts
import { z as z3 } from "zod";
var point3 = z3.object({
  x: distance,
  y: distance,
  z: distance
});
var position3 = point3;
expectTypesMatch(true);

// src/common/size.ts
import { z as z4 } from "zod";
var size = z4.object({
  width: z4.number(),
  height: z4.number()
});
expectTypesMatch(true);

// src/common/getZodPrefixedIdWithDefault.ts
import { z as z5 } from "zod";
var randomId = (length4) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: length4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};
var getZodPrefixedIdWithDefault = (prefix) => {
  return z5.string().optional().default(() => `${prefix}_${randomId(10)}`);
};

// src/common/NinePointAnchor.ts
import { z as z6 } from "zod";
var ninePointAnchor = z6.enum([
  "top_left",
  "top_center",
  "top_right",
  "center_left",
  "center",
  "center_right",
  "bottom_left",
  "bottom_center",
  "bottom_right"
]);
expectTypesMatch(true);

// src/common/PcbRenderLayer.ts
import { z as z7 } from "zod";
var pcbRenderLayer = z7.enum([
  "top_silkscreen",
  "bottom_silkscreen",
  "top_copper",
  "bottom_copper",
  "top_soldermask",
  "bottom_soldermask",
  "top_fabrication_note",
  "bottom_fabrication_note",
  "top_user_note",
  "bottom_user_note",
  "top_courtyard",
  "bottom_courtyard",
  "inner1_copper",
  "inner2_copper",
  "inner3_copper",
  "inner4_copper",
  "inner5_copper",
  "inner6_copper",
  "inner7_copper",
  "inner8_copper",
  "edge_cuts",
  "drill"
]);
expectTypesMatch(true);

// src/common/asset.ts
import { z as z8 } from "zod";
var asset = z8.object({
  project_relative_path: z8.string(),
  url: z8.string(),
  mimetype: z8.string()
});
expectTypesMatch(true);

// src/common/kicadFootprintMetadata.ts
import { z as z9 } from "zod";
var kicadAt = point.extend({
  rotation: rotation.optional()
});
expectTypesMatch(true);
var kicadFont = z9.object({
  size: point.optional(),
  thickness: distance.optional()
});
expectTypesMatch(true);
var kicadEffects = z9.object({
  font: kicadFont.optional()
});
expectTypesMatch(true);
var kicadProperty = z9.object({
  value: z9.string(),
  at: kicadAt.optional(),
  layer: z9.string().optional(),
  uuid: z9.string().optional(),
  hide: z9.boolean().optional(),
  effects: kicadEffects.optional()
});
expectTypesMatch(true);
var kicadFootprintProperties = z9.object({
  Reference: kicadProperty.optional(),
  Value: kicadProperty.optional(),
  Datasheet: kicadProperty.optional(),
  Description: kicadProperty.optional()
});
expectTypesMatch(
  true
);
var kicadFootprintAttributes = z9.object({
  through_hole: z9.boolean().optional(),
  smd: z9.boolean().optional(),
  exclude_from_pos_files: z9.boolean().optional(),
  exclude_from_bom: z9.boolean().optional()
});
expectTypesMatch(
  true
);
var kicadFootprintPad = z9.object({
  name: z9.string(),
  type: z9.string(),
  shape: z9.string().optional(),
  at: kicadAt.optional(),
  size: point.optional(),
  drill: distance.optional(),
  layers: z9.array(z9.string()).optional(),
  removeUnusedLayers: z9.boolean().optional(),
  uuid: z9.string().optional()
});
expectTypesMatch(true);
var kicadFootprintModel = z9.object({
  path: z9.string(),
  offset: point3.optional(),
  scale: point3.optional(),
  rotate: point3.optional()
});
expectTypesMatch(true);
var kicadFootprintMetadata = z9.object({
  footprintName: z9.string().optional(),
  version: z9.union([z9.number(), z9.string()]).optional(),
  generator: z9.string().optional(),
  generatorVersion: z9.union([z9.number(), z9.string()]).optional(),
  layer: z9.string().optional(),
  properties: kicadFootprintProperties.optional(),
  attributes: kicadFootprintAttributes.optional(),
  pads: z9.array(kicadFootprintPad).optional(),
  embeddedFonts: z9.boolean().optional(),
  model: kicadFootprintModel.optional()
});
expectTypesMatch(true);

// src/common/kicadSymbolMetadata.ts
import { z as z10 } from "zod";
var kicadSymbolPinNumbers = z10.object({
  hide: z10.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolPinNames = z10.object({
  offset: distance.optional(),
  hide: z10.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolEffects = z10.object({
  font: kicadFont.optional(),
  justify: z10.union([z10.string(), z10.array(z10.string())]).optional(),
  hide: z10.boolean().optional()
});
expectTypesMatch(true);
var kicadSymbolProperty = z10.object({
  value: z10.string(),
  id: z10.union([z10.number(), z10.string()]).optional(),
  at: kicadAt.optional(),
  effects: kicadSymbolEffects.optional()
});
expectTypesMatch(true);
var kicadSymbolProperties = z10.object({
  Reference: kicadSymbolProperty.optional(),
  Value: kicadSymbolProperty.optional(),
  Footprint: kicadSymbolProperty.optional(),
  Datasheet: kicadSymbolProperty.optional(),
  Description: kicadSymbolProperty.optional(),
  ki_keywords: kicadSymbolProperty.optional(),
  ki_fp_filters: kicadSymbolProperty.optional()
});
expectTypesMatch(true);
var kicadSymbolMetadata = z10.object({
  symbolName: z10.string().optional(),
  extends: z10.string().optional(),
  pinNumbers: kicadSymbolPinNumbers.optional(),
  pinNames: kicadSymbolPinNames.optional(),
  excludeFromSim: z10.boolean().optional(),
  inBom: z10.boolean().optional(),
  onBoard: z10.boolean().optional(),
  properties: kicadSymbolProperties.optional(),
  embeddedFonts: z10.boolean().optional()
});
expectTypesMatch(true);

// src/base_circuit_json_error.ts
import { z as z11 } from "zod";
var base_circuit_json_error = z11.object({
  error_type: z11.string(),
  message: z11.string(),
  is_fatal: z11.boolean().optional()
});
expectTypesMatch(true);

// src/source/source_simple_capacitor.ts
import { z as z14 } from "zod";

// src/pcb/properties/supplier_name.ts
import { z as z12 } from "zod";
var supplier_name = z12.enum([
  "jlcpcb",
  "macrofab",
  "pcbway",
  "digikey",
  "mouser",
  "lcsc"
]);
expectTypesMatch(true);

// src/source/base/source_component_base.ts
import { z as z13 } from "zod";
var source_component_base = z13.object({
  type: z13.literal("source_component"),
  ftype: z13.string().optional(),
  source_component_id: z13.string(),
  name: z13.string(),
  manufacturer_part_number: z13.string().optional(),
  supplier_part_numbers: z13.record(supplier_name, z13.array(z13.string())).optional(),
  display_value: z13.string().optional(),
  display_name: z13.string().optional(),
  are_pins_interchangeable: z13.boolean().optional(),
  internally_connected_source_port_ids: z13.array(z13.array(z13.string())).optional(),
  source_group_id: z13.string().optional(),
  subcircuit_id: z13.string().optional()
});
expectTypesMatch(true);

// src/source/source_simple_capacitor.ts
var source_simple_capacitor = source_component_base.extend({
  ftype: z14.literal("simple_capacitor"),
  capacitance,
  max_voltage_rating: voltage.optional(),
  display_capacitance: z14.string().optional(),
  max_decoupling_trace_length: distance.optional()
});
expectTypesMatch(true);

// src/source/source_simple_resistor.ts
import { z as z15 } from "zod";
var source_simple_resistor = source_component_base.extend({
  ftype: z15.literal("simple_resistor"),
  resistance,
  display_resistance: z15.string().optional()
});
expectTypesMatch(true);

// src/source/source_simple_diode.ts
import { z as z16 } from "zod";
var source_simple_diode = source_component_base.extend({
  ftype: z16.literal("simple_diode")
});
expectTypesMatch(true);

// src/source/source_simple_fiducial.ts
import { z as z17 } from "zod";
var source_simple_fiducial = source_component_base.extend({
  ftype: z17.literal("simple_fiducial")
});
expectTypesMatch(true);

// src/source/source_simple_led.ts
import { z as z18 } from "zod";
var source_simple_led = source_simple_diode.extend({
  ftype: z18.literal("simple_led"),
  color: z18.string().optional(),
  wavelength: z18.string().optional()
});
expectTypesMatch(true);

// src/source/source_simple_ground.ts
import { z as z19 } from "zod";
var source_simple_ground = source_component_base.extend({
  ftype: z19.literal("simple_ground")
});
expectTypesMatch(true);

// src/source/source_simple_chip.ts
import { z as z20 } from "zod";
var source_simple_chip = source_component_base.extend({
  ftype: z20.literal("simple_chip")
});
expectTypesMatch(true);

// src/source/source_simple_power_source.ts
import { z as z21 } from "zod";
var source_simple_power_source = source_component_base.extend({
  ftype: z21.literal("simple_power_source"),
  voltage
});
expectTypesMatch(true);

// src/source/source_simple_current_source.ts
import { z as z22 } from "zod";
var source_simple_current_source = source_component_base.extend({
  ftype: z22.literal("simple_current_source"),
  current,
  frequency: frequency.optional(),
  peak_to_peak_current: current.optional(),
  wave_shape: z22.enum(["sine", "square", "triangle", "sawtooth", "dc"]).optional().default("dc"),
  phase: z22.number().optional(),
  duty_cycle: z22.number().min(0).max(1).optional()
});
expectTypesMatch(
  true
);

// src/source/source_simple_fuse.ts
import { z as z23 } from "zod";
var source_simple_fuse = source_component_base.extend({
  ftype: z23.literal("simple_fuse"),
  current_rating_amps: z23.number().describe("Nominal current in amps the fuse is rated for"),
  voltage_rating_volts: z23.number().describe("Voltage rating in volts, e.g. \xB15V would be 5")
});
expectTypesMatch(true);

// src/source/source_simple_ammeter.ts
import { z as z24 } from "zod";
var source_simple_ammeter = source_component_base.extend({
  ftype: z24.literal("simple_ammeter")
});
expectTypesMatch(true);

// src/source/properties/source_pin_attributes.ts
import { z as z25 } from "zod";
var source_pin_attributes = z25.object({
  must_be_connected: z25.boolean().optional(),
  provides_power: z25.boolean().optional(),
  requires_power: z25.boolean().optional(),
  provides_ground: z25.boolean().optional(),
  requires_ground: z25.boolean().optional(),
  provides_voltage: z25.union([z25.string(), z25.number()]).optional(),
  requires_voltage: z25.union([z25.string(), z25.number()]).optional(),
  do_not_connect: z25.boolean().optional(),
  include_in_board_pinout: z25.boolean().optional(),
  can_use_internal_pullup: z25.boolean().optional(),
  is_using_internal_pullup: z25.boolean().optional(),
  needs_external_pullup: z25.boolean().optional(),
  can_use_internal_pulldown: z25.boolean().optional(),
  is_using_internal_pulldown: z25.boolean().optional(),
  needs_external_pulldown: z25.boolean().optional(),
  can_use_open_drain: z25.boolean().optional(),
  is_using_open_drain: z25.boolean().optional(),
  can_use_push_pull: z25.boolean().optional(),
  is_using_push_pull: z25.boolean().optional(),
  should_have_decoupling_capacitor: z25.boolean().optional(),
  recommended_decoupling_capacitor_capacitance: z25.union([z25.string(), z25.number()]).optional(),
  is_configured_for_i2c_sda: z25.boolean().optional(),
  is_configured_for_i2c_scl: z25.boolean().optional(),
  is_configured_for_spi_mosi: z25.boolean().optional(),
  is_configured_for_spi_miso: z25.boolean().optional(),
  is_configured_for_spi_sck: z25.boolean().optional(),
  is_configured_for_spi_cs: z25.boolean().optional(),
  is_configured_for_uart_tx: z25.boolean().optional(),
  is_configured_for_uart_rx: z25.boolean().optional(),
  supports_i2c_sda: z25.boolean().optional(),
  supports_i2c_scl: z25.boolean().optional(),
  supports_spi_mosi: z25.boolean().optional(),
  supports_spi_miso: z25.boolean().optional(),
  supports_spi_sck: z25.boolean().optional(),
  supports_spi_cs: z25.boolean().optional(),
  supports_uart_tx: z25.boolean().optional(),
  supports_uart_rx: z25.boolean().optional()
});
expectTypesMatch(true);

// src/source/any_source_component.ts
import { z as z54 } from "zod";

// src/source/source_simple_battery.ts
import { z as z26 } from "zod";
var source_simple_battery = source_component_base.extend({
  ftype: z26.literal("simple_battery"),
  capacity: battery_capacity
});
expectTypesMatch(true);

// src/source/source_simple_inductor.ts
import { z as z27 } from "zod";
var source_simple_inductor = source_component_base.extend({
  ftype: z27.literal("simple_inductor"),
  inductance,
  display_inductance: z27.string().optional(),
  max_current_rating: z27.number().optional()
});
expectTypesMatch(true);

// src/source/source_simple_push_button.ts
import { z as z28 } from "zod";
var source_simple_push_button = source_component_base.extend({
  ftype: z28.literal("simple_push_button")
});
expectTypesMatch(true);

// src/source/source_simple_potentiometer.ts
import { z as z29 } from "zod";
var source_simple_potentiometer = source_component_base.extend({
  ftype: z29.literal("simple_potentiometer"),
  max_resistance: resistance,
  display_max_resistance: z29.string().optional()
});
expectTypesMatch(
  true
);

// src/source/source_simple_crystal.ts
import { z as z30 } from "zod";
var source_simple_crystal = source_component_base.extend({
  ftype: z30.literal("simple_crystal"),
  frequency: z30.number().describe("Frequency in Hz"),
  load_capacitance: z30.number().optional().describe("Load capacitance in pF"),
  pin_variant: z30.enum(["two_pin", "four_pin"]).optional()
});
expectTypesMatch(true);

// src/source/source_simple_pin_header.ts
import { z as z31 } from "zod";
var source_simple_pin_header = source_component_base.extend({
  ftype: z31.literal("simple_pin_header"),
  pin_count: z31.number(),
  gender: z31.enum(["male", "female"]).optional().default("male")
});
expectTypesMatch(true);

// src/source/source_simple_connector.ts
import { z as z32 } from "zod";
var source_simple_connector = source_component_base.extend({
  ftype: z32.literal("simple_connector"),
  standard: z32.enum(["usb_c", "m2"]).optional()
});
expectTypesMatch(true);

// src/source/source_simple_pinout.ts
import { z as z33 } from "zod";
var source_simple_pinout = source_component_base.extend({
  ftype: z33.literal("simple_pinout")
});
expectTypesMatch(true);

// src/source/source_simple_resonator.ts
import { z as z34 } from "zod";
var source_simple_resonator = source_component_base.extend({
  ftype: z34.literal("simple_resonator"),
  load_capacitance: capacitance,
  equivalent_series_resistance: resistance.optional(),
  frequency
});
expectTypesMatch(true);

// src/source/source_simple_transistor.ts
import { z as z35 } from "zod";
var source_simple_transistor = source_component_base.extend({
  ftype: z35.literal("simple_transistor"),
  transistor_type: z35.enum(["npn", "pnp"])
});
expectTypesMatch(true);

// src/source/source_simple_test_point.ts
import { z as z36 } from "zod";
var source_simple_test_point = source_component_base.extend({
  ftype: z36.literal("simple_test_point"),
  footprint_variant: z36.enum(["pad", "through_hole"]).optional(),
  pad_shape: z36.enum(["rect", "circle"]).optional(),
  pad_diameter: z36.union([z36.number(), z36.string()]).optional(),
  hole_diameter: z36.union([z36.number(), z36.string()]).optional(),
  width: z36.union([z36.number(), z36.string()]).optional(),
  height: z36.union([z36.number(), z36.string()]).optional()
});
expectTypesMatch(true);

// src/source/source_simple_mosfet.ts
import { z as z37 } from "zod";
var source_simple_mosfet = source_component_base.extend({
  ftype: z37.literal("simple_mosfet"),
  channel_type: z37.enum(["n", "p"]),
  mosfet_mode: z37.enum(["enhancement", "depletion"])
});
expectTypesMatch(true);

// src/source/source_simple_op_amp.ts
import { z as z38 } from "zod";
var source_simple_op_amp = source_component_base.extend({
  ftype: z38.literal("simple_op_amp")
});
expectTypesMatch(true);

// src/source/source_simple_switch.ts
import { z as z39 } from "zod";
var source_simple_switch = source_component_base.extend({
  ftype: z39.literal("simple_switch")
});
expectTypesMatch(true);

// src/source/source_project_metadata.ts
import { z as z40 } from "zod";
var source_project_metadata = z40.object({
  type: z40.literal("source_project_metadata"),
  name: z40.string().optional(),
  software_used_string: z40.string().optional(),
  project_url: z40.string().optional(),
  source_filesystem_md5_hash: z40.string().optional(),
  created_at: timestamp.optional()
});
expectTypesMatch(true);

// src/source/source_missing_property_error.ts
import { z as z41 } from "zod";
var source_missing_property_error = base_circuit_json_error.extend({
  type: z41.literal("source_missing_property_error"),
  source_missing_property_error_id: getZodPrefixedIdWithDefault(
    "source_missing_property_error"
  ),
  source_component_id: z41.string(),
  property_name: z41.string(),
  subcircuit_id: z41.string().optional(),
  error_type: z41.literal("source_missing_property_error").default("source_missing_property_error")
}).describe("The source code is missing a property");
expectTypesMatch(true);

// src/source/source_failed_to_create_component_error.ts
import { z as z42 } from "zod";
var source_failed_to_create_component_error = base_circuit_json_error.extend({
  type: z42.literal("source_failed_to_create_component_error"),
  source_failed_to_create_component_error_id: getZodPrefixedIdWithDefault(
    "source_failed_to_create_component_error"
  ),
  error_type: z42.literal("source_failed_to_create_component_error").default("source_failed_to_create_component_error"),
  component_name: z42.string().optional(),
  subcircuit_id: z42.string().optional(),
  parent_source_component_id: z42.string().optional(),
  pcb_center: z42.object({
    x: z42.number().optional(),
    y: z42.number().optional()
  }).optional(),
  schematic_center: z42.object({
    x: z42.number().optional(),
    y: z42.number().optional()
  }).optional()
}).describe("Error emitted when a component fails to be constructed");
expectTypesMatch(true);

// src/source/source_invalid_component_property_error.ts
import { z as z43 } from "zod";
var source_invalid_component_property_error = base_circuit_json_error.extend({
  type: z43.literal("source_invalid_component_property_error"),
  source_invalid_component_property_error_id: getZodPrefixedIdWithDefault(
    "source_invalid_component_property_error"
  ),
  source_component_id: z43.string(),
  property_name: z43.string(),
  property_value: z43.unknown().optional(),
  expected_format: z43.string().optional(),
  subcircuit_id: z43.string().optional(),
  error_type: z43.literal("source_invalid_component_property_error").default("source_invalid_component_property_error")
}).describe("The source component property is invalid");
expectTypesMatch(true);

// src/source/source_trace_not_connected_error.ts
import { z as z44 } from "zod";
var source_trace_not_connected_error = base_circuit_json_error.extend({
  type: z44.literal("source_trace_not_connected_error"),
  source_trace_not_connected_error_id: getZodPrefixedIdWithDefault(
    "source_trace_not_connected_error"
  ),
  error_type: z44.literal("source_trace_not_connected_error").default("source_trace_not_connected_error"),
  subcircuit_id: z44.string().optional(),
  source_group_id: z44.string().optional(),
  source_trace_id: z44.string().optional(),
  connected_source_port_ids: z44.array(z44.string()).optional(),
  selectors_not_found: z44.array(z44.string()).optional()
}).describe("Occurs when a source trace selector does not match any ports");
expectTypesMatch(true);

// src/source/source_property_ignored_warning.ts
import { z as z45 } from "zod";
var source_property_ignored_warning = z45.object({
  type: z45.literal("source_property_ignored_warning"),
  source_property_ignored_warning_id: getZodPrefixedIdWithDefault(
    "source_property_ignored_warning"
  ),
  source_component_id: z45.string(),
  property_name: z45.string(),
  subcircuit_id: z45.string().optional(),
  error_type: z45.literal("source_property_ignored_warning").default("source_property_ignored_warning"),
  message: z45.string()
}).describe("The source property was ignored");
expectTypesMatch(true);

// src/source/source_pin_missing_trace_warning.ts
import { z as z46 } from "zod";
var source_pin_missing_trace_warning = z46.object({
  type: z46.literal("source_pin_missing_trace_warning"),
  source_pin_missing_trace_warning_id: getZodPrefixedIdWithDefault(
    "source_pin_missing_trace_warning"
  ),
  warning_type: z46.literal("source_pin_missing_trace_warning").default("source_pin_missing_trace_warning"),
  message: z46.string(),
  source_component_id: z46.string(),
  source_port_id: z46.string(),
  subcircuit_id: z46.string().optional()
}).describe(
  "Warning emitted when a source component pin is missing a trace connection"
);
expectTypesMatch(true);

// src/source/source_missing_manufacturer_part_number_warning.ts
import { z as z47 } from "zod";
var source_missing_manufacturer_part_number_warning = z47.object({
  type: z47.literal("source_missing_manufacturer_part_number_warning"),
  source_missing_manufacturer_part_number_warning_id: getZodPrefixedIdWithDefault(
    "source_missing_manufacturer_part_number_warning"
  ),
  warning_type: z47.literal("source_missing_manufacturer_part_number_warning").default("source_missing_manufacturer_part_number_warning"),
  message: z47.string(),
  source_component_id: z47.string(),
  standard: z47.string(),
  subcircuit_id: z47.string().optional()
}).describe(
  "Warning emitted when a standard connector is missing manufacturer part number"
);
expectTypesMatch(true);

// src/source/source_refdes_convention_warning.ts
import { z as z48 } from "zod";
var source_refdes_convention_warning = z48.object({
  type: z48.literal("source_refdes_convention_warning"),
  source_refdes_convention_warning_id: getZodPrefixedIdWithDefault(
    "source_refdes_convention_warning"
  ),
  warning_type: z48.literal("source_refdes_convention_warning").default("source_refdes_convention_warning"),
  message: z48.string(),
  source_component_id: z48.string(),
  refdes: z48.string(),
  source_component_ftype: z48.string(),
  expected_prefixes: z48.array(z48.string()),
  actual_prefix: z48.string().optional(),
  subcircuit_id: z48.string().optional()
}).describe(
  "Warning emitted when a source component reference designator does not match the component type convention"
);
expectTypesMatch(true);

// src/source/source_simple_voltage_probe.ts
import { z as z49 } from "zod";
var source_simple_voltage_probe = source_component_base.extend({
  ftype: z49.literal("simple_voltage_probe")
});
expectTypesMatch(
  true
);

// src/source/source_interconnect.ts
import { z as z50 } from "zod";
var source_interconnect = source_component_base.extend({
  ftype: z50.literal("interconnect")
});
expectTypesMatch(true);

// src/source/source_i2c_misconfigured_error.ts
import { z as z51 } from "zod";
var source_i2c_misconfigured_error = base_circuit_json_error.extend({
  type: z51.literal("source_i2c_misconfigured_error"),
  source_i2c_misconfigured_error_id: getZodPrefixedIdWithDefault(
    "source_i2c_misconfigured_error"
  ),
  error_type: z51.literal("source_i2c_misconfigured_error").default("source_i2c_misconfigured_error"),
  source_port_ids: z51.array(z51.string())
}).describe(
  "Error emitted when incompatible I2C pins (e.g. SDA and SCL) are connected to the same net"
);
expectTypesMatch(true);

// src/source/source_component_misconfigured_error.ts
import { z as z52 } from "zod";
var source_component_misconfigured_error = base_circuit_json_error.extend({
  type: z52.literal("source_component_misconfigured_error"),
  source_component_misconfigured_error_id: getZodPrefixedIdWithDefault(
    "source_component_misconfigured_error"
  ),
  error_type: z52.literal("source_component_misconfigured_error").default("source_component_misconfigured_error"),
  source_component_ids: z52.array(z52.string()),
  source_port_ids: z52.array(z52.string()).optional()
}).describe(
  "Error emitted when one or more source components have an invalid or conflicting configuration"
);
expectTypesMatch(true);

// src/source/source_simple_voltage_source.ts
import { z as z53 } from "zod";
var source_simple_voltage_source = source_component_base.extend({
  ftype: z53.literal("simple_voltage_source"),
  voltage,
  frequency: frequency.optional(),
  peak_to_peak_voltage: voltage.optional(),
  wave_shape: z53.enum(["sinewave", "square", "triangle", "sawtooth"]).optional(),
  phase: rotation.optional(),
  duty_cycle: z53.number().optional().describe("Duty cycle as a fraction (0 to 1)"),
  pulse_delay: ms.optional(),
  rise_time: ms.optional(),
  fall_time: ms.optional(),
  pulse_width: ms.optional(),
  period: ms.optional()
});
expectTypesMatch(
  true
);

// src/source/any_source_component.ts
var any_source_component = z54.union([
  source_simple_resistor,
  source_simple_capacitor,
  source_simple_diode,
  source_simple_fiducial,
  source_simple_led,
  source_simple_ground,
  source_simple_chip,
  source_simple_power_source,
  source_simple_current_source,
  source_simple_ammeter,
  source_simple_battery,
  source_simple_inductor,
  source_simple_push_button,
  source_simple_potentiometer,
  source_simple_crystal,
  source_simple_pin_header,
  source_simple_connector,
  source_simple_pinout,
  source_simple_resonator,
  source_simple_switch,
  source_simple_transistor,
  source_simple_test_point,
  source_simple_mosfet,
  source_simple_op_amp,
  source_simple_fuse,
  source_simple_voltage_probe,
  source_interconnect,
  source_simple_voltage_source,
  source_project_metadata,
  source_missing_property_error,
  source_invalid_component_property_error,
  source_failed_to_create_component_error,
  source_trace_not_connected_error,
  source_property_ignored_warning,
  source_pin_missing_trace_warning,
  source_missing_manufacturer_part_number_warning,
  source_refdes_convention_warning,
  source_i2c_misconfigured_error,
  source_component_misconfigured_error
]);
expectTypesMatch(true);

// src/source/source_port.ts
import { z as z55 } from "zod";
var source_port = z55.object({
  type: z55.literal("source_port"),
  pin_number: z55.number().optional(),
  port_hints: z55.array(z55.string()).optional(),
  name: z55.string(),
  source_port_id: z55.string(),
  source_component_id: z55.string().optional(),
  source_group_id: z55.string().optional(),
  most_frequently_referenced_by_name: z55.string().optional(),
  subcircuit_id: z55.string().optional(),
  subcircuit_connectivity_map_key: z55.string().optional()
}).merge(source_pin_attributes);
expectTypesMatch(true);

// src/source/source_component_internal_connection.ts
import { z as z56 } from "zod";
var source_component_internal_connection = z56.object({
  type: z56.literal("source_component_internal_connection"),
  source_component_internal_connection_id: z56.string(),
  source_component_id: z56.string(),
  source_port_ids: z56.array(z56.string()),
  subcircuit_id: z56.string().optional()
});
expectTypesMatch(true);

// src/source/source_trace.ts
import { z as z57 } from "zod";
var source_trace = z57.object({
  type: z57.literal("source_trace"),
  source_trace_id: z57.string(),
  connected_source_port_ids: z57.array(z57.string()),
  connected_source_net_ids: z57.array(z57.string()),
  subcircuit_id: z57.string().optional(),
  subcircuit_connectivity_map_key: z57.string().optional(),
  max_length: z57.number().optional(),
  name: z57.string().optional(),
  min_trace_thickness: z57.number().optional(),
  display_name: z57.string().optional()
});
expectTypesMatch(true);

// src/source/source_group.ts
import { z as z58 } from "zod";
var source_group = z58.object({
  type: z58.literal("source_group"),
  source_group_id: z58.string(),
  subcircuit_id: z58.string().optional(),
  parent_subcircuit_id: z58.string().optional(),
  parent_source_group_id: z58.string().optional(),
  is_subcircuit: z58.boolean().optional(),
  show_as_schematic_box: z58.boolean().optional(),
  name: z58.string().optional(),
  was_automatically_named: z58.boolean().optional()
});
expectTypesMatch(true);

// src/source/source_net.ts
import { z as z59 } from "zod";
var source_net = z59.object({
  type: z59.literal("source_net"),
  source_net_id: z59.string(),
  name: z59.string(),
  member_source_group_ids: z59.array(z59.string()),
  is_power: z59.boolean().optional(),
  is_ground: z59.boolean().optional(),
  is_digital_signal: z59.boolean().optional(),
  is_analog_signal: z59.boolean().optional(),
  is_positive_voltage_source: z59.boolean().optional(),
  trace_width: z59.number().optional(),
  subcircuit_id: z59.string().optional(),
  subcircuit_connectivity_map_key: z59.string().optional()
});
expectTypesMatch(true);

// src/source/source_board.ts
import { z as z60 } from "zod";
var source_board = z60.object({
  type: z60.literal("source_board"),
  source_board_id: z60.string(),
  source_group_id: z60.string(),
  title: z60.string().optional()
}).describe("Defines a board in the source domain");
expectTypesMatch(true);

// src/source/source_ambiguous_port_reference.ts
import { z as z61 } from "zod";
var source_ambiguous_port_reference = base_circuit_json_error.extend({
  type: z61.literal("source_ambiguous_port_reference"),
  source_ambiguous_port_reference_id: getZodPrefixedIdWithDefault(
    "source_ambiguous_port_reference"
  ),
  error_type: z61.literal("source_ambiguous_port_reference").default("source_ambiguous_port_reference"),
  source_port_id: z61.string().optional(),
  source_component_id: z61.string().optional()
}).describe(
  "Error emitted when a port hint matches multiple non-overlapping pads, making the port reference ambiguous"
);
expectTypesMatch(true);

// src/source/source_pcb_ground_plane.ts
import { z as z62 } from "zod";
var source_pcb_ground_plane = z62.object({
  type: z62.literal("source_pcb_ground_plane"),
  source_pcb_ground_plane_id: z62.string(),
  source_group_id: z62.string(),
  source_net_id: z62.string(),
  subcircuit_id: z62.string().optional()
}).describe("Defines a ground plane in the source domain");
expectTypesMatch(true);

// src/source/source_manually_placed_via.ts
import { z as z64 } from "zod";

// src/pcb/properties/layer_ref.ts
import { z as z63 } from "zod";
var all_layers = [
  "top",
  "bottom",
  "inner1",
  "inner2",
  "inner3",
  "inner4",
  "inner5",
  "inner6",
  "inner7",
  "inner8"
];
var layer_string = z63.enum(all_layers);
var layer_ref = layer_string.or(
  z63.object({
    name: layer_string
  })
).transform((layer) => {
  if (typeof layer === "string") {
    return layer;
  }
  return layer.name;
});
expectTypesMatch(true);
var visible_layer = z63.enum(["top", "bottom"]);

// src/source/source_manually_placed_via.ts
var source_manually_placed_via = z64.object({
  type: z64.literal("source_manually_placed_via"),
  source_manually_placed_via_id: z64.string(),
  source_group_id: z64.string(),
  source_net_id: z64.string(),
  subcircuit_id: z64.string().optional(),
  source_trace_id: z64.string().optional()
}).describe("Defines a via that is manually placed in the source domain");
expectTypesMatch(true);

// src/source/source_unnamed_trace_warning.ts
import { z as z65 } from "zod";
var source_unnamed_trace_warning = z65.object({
  type: z65.literal("source_unnamed_trace_warning"),
  source_unnamed_trace_warning_id: getZodPrefixedIdWithDefault(
    "source_unnamed_trace_warning"
  ),
  warning_type: z65.literal("source_unnamed_trace_warning").default("source_unnamed_trace_warning"),
  message: z65.string(),
  source_trace_id: z65.string(),
  subcircuit_id: z65.string().optional()
}).describe("Warning emitted when a source trace is missing a name");
expectTypesMatch(
  true
);

// src/source/source_no_power_pin_defined_warning.ts
import { z as z66 } from "zod";
var source_no_power_pin_defined_warning = z66.object({
  type: z66.literal("source_no_power_pin_defined_warning"),
  source_no_power_pin_defined_warning_id: getZodPrefixedIdWithDefault(
    "source_no_power_pin_defined_warning"
  ),
  warning_type: z66.literal("source_no_power_pin_defined_warning").default("source_no_power_pin_defined_warning"),
  message: z66.string(),
  source_component_id: z66.string(),
  source_port_ids: z66.array(z66.string()),
  subcircuit_id: z66.string().optional()
}).describe(
  "Warning emitted when a chip has no source ports with requires_power=true"
);
expectTypesMatch(true);

// src/source/source_no_ground_pin_defined_warning.ts
import { z as z67 } from "zod";
var source_no_ground_pin_defined_warning = z67.object({
  type: z67.literal("source_no_ground_pin_defined_warning"),
  source_no_ground_pin_defined_warning_id: getZodPrefixedIdWithDefault(
    "source_no_ground_pin_defined_warning"
  ),
  warning_type: z67.literal("source_no_ground_pin_defined_warning").default("source_no_ground_pin_defined_warning"),
  message: z67.string(),
  source_component_id: z67.string(),
  source_port_ids: z67.array(z67.string()),
  subcircuit_id: z67.string().optional()
}).describe(
  "Warning emitted when a chip has no source ports marked as ground pins"
);
expectTypesMatch(true);

// src/source/source_component_pins_underspecified_warning.ts
import { z as z68 } from "zod";
var source_component_pins_underspecified_warning = z68.object({
  type: z68.literal("source_component_pins_underspecified_warning"),
  source_component_pins_underspecified_warning_id: getZodPrefixedIdWithDefault(
    "source_component_pins_underspecified_warning"
  ),
  warning_type: z68.literal("source_component_pins_underspecified_warning").default("source_component_pins_underspecified_warning"),
  message: z68.string(),
  source_component_id: z68.string(),
  source_port_ids: z68.array(z68.string()),
  subcircuit_id: z68.string().optional()
}).describe(
  "Warning emitted when all ports on a source component are underspecified"
);
expectTypesMatch(true);

// src/source/source_pin_must_be_connected_error.ts
import { z as z69 } from "zod";
var source_pin_must_be_connected_error = base_circuit_json_error.extend({
  type: z69.literal("source_pin_must_be_connected_error"),
  source_pin_must_be_connected_error_id: getZodPrefixedIdWithDefault(
    "source_pin_must_be_connected_error"
  ),
  error_type: z69.literal("source_pin_must_be_connected_error").default("source_pin_must_be_connected_error"),
  source_component_id: z69.string(),
  source_port_id: z69.string(),
  subcircuit_id: z69.string().optional()
}).describe(
  "Error emitted when a pin with mustBeConnected attribute is not connected to any trace"
);
expectTypesMatch(true);

// src/source/unknown_error_finding_part.ts
import { z as z70 } from "zod";
var unknown_error_finding_part = base_circuit_json_error.extend({
  type: z70.literal("unknown_error_finding_part"),
  unknown_error_finding_part_id: getZodPrefixedIdWithDefault(
    "unknown_error_finding_part"
  ),
  error_type: z70.literal("unknown_error_finding_part").default("unknown_error_finding_part"),
  source_component_id: z70.string().optional(),
  subcircuit_id: z70.string().optional()
}).describe(
  "Error emitted when an unexpected error occurs while finding a part"
);
expectTypesMatch(true);

// src/source/source_part_not_found_warning.ts
import { z as z71 } from "zod";
var source_part_not_found_warning = z71.object({
  type: z71.literal("source_part_not_found_warning"),
  source_part_not_found_warning_id: getZodPrefixedIdWithDefault(
    "source_part_not_found_warning"
  ),
  warning_type: z71.literal("source_part_not_found_warning").default("source_part_not_found_warning"),
  message: z71.string(),
  source_component_id: z71.string().optional(),
  subcircuit_id: z71.string().optional(),
  supplier_name: supplier_name.optional(),
  manufacturer_part_number: z71.string().optional(),
  supplier_part_number: z71.string().optional(),
  part_name: z71.string().optional()
}).describe("Warning emitted when a requested part can not be found");
expectTypesMatch(
  true
);

// src/schematic/schematic_box.ts
import { z as z72 } from "zod";
var schematic_box = z72.object({
  type: z72.literal("schematic_box"),
  schematic_sheet_id: z72.string().optional(),
  schematic_component_id: z72.string().optional(),
  schematic_symbol_id: z72.string().optional(),
  width: distance,
  height: distance,
  is_dashed: z72.boolean().default(false),
  x: distance,
  y: distance,
  subcircuit_id: z72.string().optional()
}).describe("Draws a box on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_path.ts
import { z as z73 } from "zod";
var schematic_path = z73.object({
  type: z73.literal("schematic_path"),
  schematic_path_id: getZodPrefixedIdWithDefault("schematic_path"),
  schematic_sheet_id: z73.string().optional(),
  schematic_component_id: z73.string().optional(),
  schematic_symbol_id: z73.string().optional(),
  fill_color: z73.string().optional(),
  is_filled: z73.boolean().optional(),
  is_dashed: z73.boolean().default(false),
  stroke_width: distance.nullable().optional(),
  stroke_color: z73.string().optional(),
  dash_length: distance.optional(),
  dash_gap: distance.optional(),
  points: z73.array(point),
  subcircuit_id: z73.string().optional()
});
expectTypesMatch(true);

// src/schematic/schematic_component.ts
import { z as z74 } from "zod";
var schematic_pin_styles = z74.record(
  z74.object({
    left_margin: length.optional(),
    right_margin: length.optional(),
    top_margin: length.optional(),
    bottom_margin: length.optional()
  })
);
var schematic_component_port_arrangement_by_size = z74.object({
  left_size: z74.number(),
  right_size: z74.number(),
  top_size: z74.number().optional(),
  bottom_size: z74.number().optional()
});
expectTypesMatch(true);
var schematic_component_port_arrangement_by_sides = z74.object({
  left_side: z74.object({
    pins: z74.array(z74.number()),
    // @ts-ignore
    direction: z74.enum(["top-to-bottom", "bottom-to-top"]).optional()
  }).optional(),
  right_side: z74.object({
    pins: z74.array(z74.number()),
    // @ts-ignore
    direction: z74.enum(["top-to-bottom", "bottom-to-top"]).optional()
  }).optional(),
  top_side: z74.object({
    pins: z74.array(z74.number()),
    // @ts-ignore
    direction: z74.enum(["left-to-right", "right-to-left"]).optional()
  }).optional(),
  bottom_side: z74.object({
    pins: z74.array(z74.number()),
    // @ts-ignore
    direction: z74.enum(["left-to-right", "right-to-left"]).optional()
  }).optional()
});
expectTypesMatch(true);
var port_arrangement = z74.union([
  schematic_component_port_arrangement_by_size,
  schematic_component_port_arrangement_by_sides
]);
var schematic_component = z74.object({
  type: z74.literal("schematic_component"),
  size,
  center: point,
  source_component_id: z74.string().optional(),
  schematic_component_id: z74.string(),
  schematic_sheet_id: z74.string().optional(),
  schematic_symbol_id: z74.string().optional(),
  pin_spacing: length.optional(),
  pin_styles: schematic_pin_styles.optional(),
  box_width: length.optional(),
  symbol_name: z74.string().optional(),
  port_arrangement: port_arrangement.optional(),
  port_labels: z74.record(z74.string()).optional(),
  symbol_display_value: z74.string().optional(),
  subcircuit_id: z74.string().optional(),
  schematic_group_id: z74.string().optional(),
  is_schematic_group: z74.boolean().optional(),
  source_group_id: z74.string().optional(),
  is_box_with_pins: z74.boolean().optional().default(true)
});
expectTypesMatch(true);

// src/schematic/schematic_symbol.ts
import { z as z75 } from "zod";
var schematicSymbolMetadata = z75.object({
  kicad_symbol: kicadSymbolMetadata.optional()
}).catchall(z75.unknown());
var schematic_symbol = z75.object({
  type: z75.literal("schematic_symbol"),
  schematic_symbol_id: z75.string(),
  name: z75.string().optional(),
  metadata: schematicSymbolMetadata.optional()
}).describe(
  "Defines a named schematic symbol that can be referenced by components."
);
expectTypesMatch(true);

// src/schematic/schematic_line.ts
import { z as z76 } from "zod";
var schematic_line = z76.object({
  type: z76.literal("schematic_line"),
  schematic_line_id: getZodPrefixedIdWithDefault("schematic_line"),
  schematic_sheet_id: z76.string().optional(),
  schematic_component_id: z76.string().optional(),
  schematic_symbol_id: z76.string().optional(),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  stroke_width: distance.nullable().optional(),
  color: z76.string().default("#000000"),
  is_dashed: z76.boolean().default(false),
  dash_length: distance.optional(),
  dash_gap: distance.optional(),
  subcircuit_id: z76.string().optional()
}).describe("Draws a styled line on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_rect.ts
import { z as z77 } from "zod";
var schematic_rect = z77.object({
  type: z77.literal("schematic_rect"),
  schematic_rect_id: getZodPrefixedIdWithDefault("schematic_rect"),
  schematic_sheet_id: z77.string().optional(),
  schematic_component_id: z77.string().optional(),
  schematic_symbol_id: z77.string().optional(),
  center: point,
  width: distance,
  height: distance,
  rotation: rotation.default(0),
  stroke_width: distance.nullable().optional(),
  color: z77.string().default("#000000"),
  is_filled: z77.boolean().default(false),
  fill_color: z77.string().optional(),
  is_dashed: z77.boolean().default(false),
  subcircuit_id: z77.string().optional()
}).describe("Draws a styled rectangle on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_circle.ts
import { z as z78 } from "zod";
var schematic_circle = z78.object({
  type: z78.literal("schematic_circle"),
  schematic_circle_id: getZodPrefixedIdWithDefault("schematic_circle"),
  schematic_sheet_id: z78.string().optional(),
  schematic_component_id: z78.string().optional(),
  schematic_symbol_id: z78.string().optional(),
  center: point,
  radius: distance,
  stroke_width: distance.nullable().optional(),
  color: z78.string().default("#000000"),
  is_filled: z78.boolean().default(false),
  fill_color: z78.string().optional(),
  is_dashed: z78.boolean().default(false),
  subcircuit_id: z78.string().optional()
}).describe("Draws a styled circle on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_arc.ts
import { z as z79 } from "zod";
var schematic_arc = z79.object({
  type: z79.literal("schematic_arc"),
  schematic_arc_id: getZodPrefixedIdWithDefault("schematic_arc"),
  schematic_sheet_id: z79.string().optional(),
  schematic_component_id: z79.string().optional(),
  schematic_symbol_id: z79.string().optional(),
  center: point,
  radius: distance,
  start_angle_degrees: rotation,
  end_angle_degrees: rotation,
  direction: z79.enum(["clockwise", "counterclockwise"]).default("counterclockwise"),
  stroke_width: distance.nullable().optional(),
  color: z79.string().default("#000000"),
  is_dashed: z79.boolean().default(false),
  subcircuit_id: z79.string().optional()
}).describe("Draws a styled arc on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_trace.ts
import { z as z80 } from "zod";
var schematic_trace = z80.object({
  type: z80.literal("schematic_trace"),
  schematic_trace_id: z80.string(),
  schematic_sheet_id: z80.string().optional(),
  source_trace_id: z80.string().optional(),
  junctions: z80.array(
    z80.object({
      x: z80.number(),
      y: z80.number()
    })
  ),
  edges: z80.array(
    z80.object({
      from: z80.object({
        x: z80.number(),
        y: z80.number()
      }),
      to: z80.object({
        x: z80.number(),
        y: z80.number()
      }),
      is_crossing: z80.boolean().optional(),
      from_schematic_port_id: z80.string().optional(),
      to_schematic_port_id: z80.string().optional()
    })
  ),
  subcircuit_id: z80.string().optional(),
  // TODO: make required in a future release
  subcircuit_connectivity_map_key: z80.string().optional()
});
expectTypesMatch(true);

// src/schematic/schematic_text.ts
import { z as z82 } from "zod";

// src/common/FivePointAnchor.ts
import { z as z81 } from "zod";
var fivePointAnchor = z81.enum([
  "center",
  "left",
  "right",
  "top",
  "bottom"
]);
expectTypesMatch(true);

// src/schematic/schematic_text.ts
var schematic_text = z82.object({
  type: z82.literal("schematic_text"),
  schematic_sheet_id: z82.string().optional(),
  schematic_component_id: z82.string().optional(),
  schematic_symbol_id: z82.string().optional(),
  schematic_text_id: z82.string(),
  text: z82.string(),
  font_size: z82.number().default(0.18),
  position: z82.object({
    x: distance,
    y: distance
  }),
  rotation: z82.number().default(0),
  anchor: z82.union([fivePointAnchor.describe("legacy"), ninePointAnchor]).default("center"),
  color: z82.string().default("#000000"),
  subcircuit_id: z82.string().optional()
});
expectTypesMatch(true);

// src/schematic/schematic_port.ts
import { z as z83 } from "zod";
var schematic_port = z83.object({
  type: z83.literal("schematic_port"),
  schematic_port_id: z83.string(),
  source_port_id: z83.string(),
  schematic_sheet_id: z83.string().optional(),
  schematic_component_id: z83.string().optional(),
  center: point,
  facing_direction: z83.enum(["up", "down", "left", "right"]).optional(),
  distance_from_component_edge: z83.number().optional(),
  side_of_component: z83.enum(["top", "bottom", "left", "right"]).optional(),
  true_ccw_index: z83.number().optional(),
  pin_number: z83.number().optional(),
  display_pin_label: z83.string().optional(),
  subcircuit_id: z83.string().optional(),
  is_connected: z83.boolean().optional(),
  is_internal_circuit_port: z83.boolean().optional(),
  is_overlapping_internal_circuit_port: z83.boolean().optional(),
  has_input_arrow: z83.boolean().optional(),
  has_output_arrow: z83.boolean().optional(),
  is_drawn_with_inversion_circle: z83.boolean().optional()
}).describe("Defines a port on a schematic component");
expectTypesMatch(true);

// src/schematic/schematic_net_label.ts
import { z as z84 } from "zod";
var schematic_net_label = z84.object({
  type: z84.literal("schematic_net_label"),
  schematic_net_label_id: getZodPrefixedIdWithDefault("schematic_net_label"),
  schematic_sheet_id: z84.string().optional(),
  schematic_trace_id: z84.string().optional(),
  source_trace_id: z84.string().optional(),
  source_net_id: z84.string(),
  center: point,
  anchor_position: point.optional(),
  anchor_side: z84.enum(["top", "bottom", "left", "right"]),
  text: z84.string(),
  symbol_name: z84.string().optional(),
  is_movable: z84.boolean().optional(),
  subcircuit_id: z84.string().optional()
});
expectTypesMatch(true);

// src/schematic/schematic_error.ts
import { z as z85 } from "zod";
var schematic_error = base_circuit_json_error.extend({
  type: z85.literal("schematic_error"),
  schematic_error_id: z85.string(),
  // eventually each error type should be broken out into a dir of files
  error_type: z85.literal("schematic_port_not_found").default("schematic_port_not_found"),
  subcircuit_id: z85.string().optional()
}).describe("Defines a schematic error on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_layout_error.ts
import { z as z86 } from "zod";
var schematic_layout_error = base_circuit_json_error.extend({
  type: z86.literal("schematic_layout_error"),
  schematic_layout_error_id: getZodPrefixedIdWithDefault(
    "schematic_layout_error"
  ),
  error_type: z86.literal("schematic_layout_error").default("schematic_layout_error"),
  source_group_id: z86.string(),
  schematic_group_id: z86.string(),
  subcircuit_id: z86.string().optional()
}).describe("Error emitted when schematic layout fails for a group");
expectTypesMatch(true);

// src/schematic/schematic_debug_object.ts
import { z as z87 } from "zod";
var schematic_debug_object_base = z87.object({
  type: z87.literal("schematic_debug_object"),
  label: z87.string().optional(),
  subcircuit_id: z87.string().optional()
});
var schematic_debug_rect = schematic_debug_object_base.extend({
  shape: z87.literal("rect"),
  center: point,
  size
});
var schematic_debug_line = schematic_debug_object_base.extend({
  shape: z87.literal("line"),
  start: point,
  end: point
});
var schematic_debug_point = schematic_debug_object_base.extend({
  shape: z87.literal("point"),
  center: point
});
var schematic_debug_object = z87.discriminatedUnion("shape", [
  schematic_debug_rect,
  schematic_debug_line,
  schematic_debug_point
]);
expectTypesMatch(true);

// src/schematic/schematic_voltage_probe.ts
import { z as z88 } from "zod";
var schematic_voltage_probe = z88.object({
  type: z88.literal("schematic_voltage_probe"),
  schematic_voltage_probe_id: z88.string(),
  schematic_sheet_id: z88.string().optional(),
  source_component_id: z88.string().optional(),
  name: z88.string().optional(),
  position: point,
  schematic_trace_id: z88.string(),
  voltage: voltage.optional(),
  subcircuit_id: z88.string().optional(),
  color: z88.string().optional(),
  label_alignment: ninePointAnchor.optional()
}).describe("Defines a voltage probe measurement point on a schematic trace");
expectTypesMatch(true);

// src/schematic/schematic_manual_edit_conflict_warning.ts
import { z as z89 } from "zod";
var schematic_manual_edit_conflict_warning = z89.object({
  type: z89.literal("schematic_manual_edit_conflict_warning"),
  schematic_manual_edit_conflict_warning_id: getZodPrefixedIdWithDefault(
    "schematic_manual_edit_conflict_warning"
  ),
  warning_type: z89.literal("schematic_manual_edit_conflict_warning").default("schematic_manual_edit_conflict_warning"),
  message: z89.string(),
  schematic_component_id: z89.string(),
  schematic_group_id: z89.string().optional(),
  subcircuit_id: z89.string().optional(),
  source_component_id: z89.string()
}).describe(
  "Warning emitted when a component has both manual placement and explicit schX/schY coordinates"
);
expectTypesMatch(true);

// src/schematic/schematic_component_overlap_warning.ts
import { z as z90 } from "zod";
var schematic_component_overlap_warning = z90.object({
  type: z90.literal("schematic_component_overlap_warning"),
  schematic_component_overlap_warning_id: getZodPrefixedIdWithDefault(
    "schematic_component_overlap_warning"
  ),
  warning_type: z90.literal("schematic_component_overlap_warning").default("schematic_component_overlap_warning"),
  message: z90.string(),
  schematic_component_ids: z90.tuple([z90.string(), z90.string()]),
  schematic_sheet_id: z90.string().optional()
}).describe(
  "Warning emitted when the rendered bounds of two schematic components overlap"
);
expectTypesMatch(true);

// src/schematic/schematic_group.ts
import { z as z91 } from "zod";
var schematic_group = z91.object({
  type: z91.literal("schematic_group"),
  schematic_group_id: getZodPrefixedIdWithDefault("schematic_group"),
  schematic_sheet_id: z91.string().optional(),
  source_group_id: z91.string(),
  is_subcircuit: z91.boolean().optional(),
  subcircuit_id: z91.string().optional(),
  width: length,
  height: length,
  center: point,
  schematic_component_ids: z91.array(z91.string()),
  show_as_schematic_box: z91.boolean().optional(),
  name: z91.string().optional(),
  description: z91.string().optional()
}).describe("Defines a group of components on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_table.ts
import { z as z92 } from "zod";
var schematic_table = z92.object({
  type: z92.literal("schematic_table"),
  schematic_table_id: getZodPrefixedIdWithDefault("schematic_table"),
  schematic_sheet_id: z92.string().optional(),
  anchor_position: point,
  column_widths: z92.array(distance),
  row_heights: z92.array(distance),
  cell_padding: distance.optional(),
  border_width: distance.optional(),
  subcircuit_id: z92.string().optional(),
  schematic_component_id: z92.string().optional(),
  anchor: ninePointAnchor.optional()
}).describe("Defines a table on the schematic");
expectTypesMatch(true);

// src/schematic/schematic_table_cell.ts
import { z as z93 } from "zod";
var schematic_table_cell = z93.object({
  type: z93.literal("schematic_table_cell"),
  schematic_table_cell_id: getZodPrefixedIdWithDefault(
    "schematic_table_cell"
  ),
  schematic_sheet_id: z93.string().optional(),
  schematic_table_id: z93.string(),
  start_row_index: z93.number(),
  end_row_index: z93.number(),
  start_column_index: z93.number(),
  end_column_index: z93.number(),
  text: z93.string().optional(),
  center: point,
  width: distance,
  height: distance,
  horizontal_align: z93.enum(["left", "center", "right"]).optional(),
  vertical_align: z93.enum(["top", "middle", "bottom"]).optional(),
  font_size: distance.optional(),
  subcircuit_id: z93.string().optional()
}).describe("Defines a cell within a schematic_table");
expectTypesMatch(true);

// src/schematic/schematic_sheet.ts
import { z as z94 } from "zod";
var schematic_sheet = z94.object({
  type: z94.literal("schematic_sheet"),
  schematic_sheet_id: getZodPrefixedIdWithDefault("schematic_sheet"),
  name: z94.string().optional(),
  sheet_index: z94.number().optional(),
  subcircuit_id: z94.string().optional(),
  outline_color: z94.string().optional()
}).describe(
  "Defines a schematic sheet or page that components can be placed on"
);
expectTypesMatch(true);

// src/pcb/properties/brep.ts
import { z as z95 } from "zod";
var point_with_bulge = z95.object({
  x: distance,
  y: distance,
  bulge: z95.number().optional()
});
expectTypesMatch(true);
var ring = z95.object({
  vertices: z95.array(point_with_bulge)
});
expectTypesMatch(true);
var brep_shape = z95.object({
  outer_ring: ring,
  inner_rings: z95.array(ring).default([])
});
expectTypesMatch(true);

// src/pcb/properties/pcb_route_hints.ts
import { z as z96 } from "zod";
var pcb_route_hint = z96.object({
  x: distance,
  y: distance,
  via: z96.boolean().optional(),
  via_to_layer: layer_ref.optional()
});
var pcb_route_hints = z96.array(pcb_route_hint);
expectTypesMatch(true);
expectTypesMatch(true);

// src/pcb/properties/route_hint_point.ts
import { z as z97 } from "zod";
var route_hint_point = z97.object({
  x: distance,
  y: distance,
  via: z97.boolean().optional(),
  to_layer: layer_ref.optional(),
  trace_width: distance.optional()
});
expectTypesMatch(true);

// src/pcb/properties/manufacturing_drc_properties.ts
import { z as z98 } from "zod";
var manufacturing_drc_properties = z98.object({
  min_trace_width: length.optional(),
  min_board_edge_clearance: length.optional(),
  min_via_hole_edge_to_via_hole_edge_clearance: length.optional(),
  min_plated_hole_drill_edge_to_drill_edge_clearance: length.optional(),
  min_trace_to_pad_edge_clearance: length.optional(),
  min_pad_edge_to_pad_edge_clearance: length.optional(),
  min_same_net_trace_edge_to_trace_edge_clearance: length.optional(),
  min_different_net_trace_edge_to_trace_edge_clearance: length.optional(),
  min_via_edge_to_pad_edge_clearance: length.optional(),
  min_via_hole_diameter: length.optional(),
  min_via_pad_diameter: length.optional()
});

// src/pcb/pcb_component.ts
import { z as z99 } from "zod";
var pcb_component = z99.object({
  type: z99.literal("pcb_component"),
  pcb_component_id: getZodPrefixedIdWithDefault("pcb_component"),
  source_component_id: z99.string(),
  center: point,
  layer: layer_ref,
  rotation,
  display_offset_x: z99.string().optional().describe(
    "How to display the x offset for this part, usually corresponding with how the user specified it"
  ),
  display_offset_y: z99.string().optional().describe(
    "How to display the y offset for this part, usually corresponding with how the user specified it"
  ),
  width: length,
  height: length,
  do_not_place: z99.boolean().optional(),
  is_allowed_to_be_off_board: z99.boolean().optional(),
  subcircuit_id: z99.string().optional(),
  pcb_group_id: z99.string().optional(),
  position_mode: z99.enum([
    "packed",
    "relative_to_group_anchor",
    "relative_to_another_component",
    "none"
  ]).optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.optional(),
  positioned_relative_to_pcb_group_id: z99.string().optional(),
  positioned_relative_to_pcb_board_id: z99.string().optional(),
  cable_insertion_center: point.optional(),
  insertion_direction: z99.enum([
    "from_above",
    "from_left",
    "from_right",
    "from_front",
    "from_back"
  ]).optional(),
  metadata: z99.object({
    kicad_footprint: kicadFootprintMetadata.optional()
  }).optional(),
  obstructs_within_bounds: z99.boolean().default(true).describe(
    "Does this component take up all the space within its bounds on a layer. This is generally true except for when separated pin headers are being represented by a single component (in which case, chips can be placed between the pin headers) or for tall modules where chips fit underneath"
  )
}).describe("Defines a component on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_hole.ts
import { z as z100 } from "zod";
var pcb_hole_circle = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.literal("circle"),
  hole_diameter: z100.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_circle_shape = pcb_hole_circle.describe(
  "Defines a circular hole on the PCB"
);
expectTypesMatch(true);
var pcb_hole_rect = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.literal("rect"),
  hole_width: z100.number(),
  hole_height: z100.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_rect_shape = pcb_hole_rect.describe(
  "Defines a rectangular (square-capable) hole on the PCB. Use equal width/height for square."
);
expectTypesMatch(true);
var pcb_hole_circle_or_square = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.enum(["circle", "square"]),
  hole_diameter: z100.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_circle_or_square_shape = pcb_hole_circle_or_square.describe(
  "Defines a circular or square hole on the PCB"
);
expectTypesMatch(true);
var pcb_hole_oval = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.literal("oval"),
  hole_width: z100.number(),
  hole_height: z100.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_oval_shape = pcb_hole_oval.describe(
  "Defines an oval hole on the PCB"
);
expectTypesMatch(true);
var pcb_hole_pill = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.literal("pill"),
  hole_width: z100.number(),
  hole_height: z100.number(),
  x: distance,
  y: distance,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_pill_shape = pcb_hole_pill.describe(
  "Defines a pill-shaped hole on the PCB"
);
expectTypesMatch(true);
var pcb_hole_rotated_pill = z100.object({
  type: z100.literal("pcb_hole"),
  pcb_hole_id: getZodPrefixedIdWithDefault("pcb_hole"),
  pcb_group_id: z100.string().optional(),
  subcircuit_id: z100.string().optional(),
  pcb_component_id: z100.string().optional(),
  hole_shape: z100.literal("rotated_pill"),
  hole_width: z100.number(),
  hole_height: z100.number(),
  x: distance,
  y: distance,
  ccw_rotation: rotation,
  is_covered_with_solder_mask: z100.boolean().optional(),
  soldermask_margin: z100.number().optional()
});
var pcb_hole_rotated_pill_shape = pcb_hole_rotated_pill.describe(
  "Defines a rotated pill-shaped hole on the PCB"
);
expectTypesMatch(true);
var pcb_hole = pcb_hole_circle_or_square.or(pcb_hole_oval).or(pcb_hole_pill).or(pcb_hole_rotated_pill).or(pcb_hole_circle).or(pcb_hole_rect);

// src/pcb/pcb_plated_hole.ts
import { z as z101 } from "zod";
var pcb_plated_hole_circle = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.literal("circle"),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  outer_diameter: z101.number(),
  hole_diameter: z101.number(),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional()
});
var pcb_plated_hole_oval = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.enum(["oval", "pill"]),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  outer_width: z101.number(),
  outer_height: z101.number(),
  hole_width: z101.number(),
  hole_height: z101.number(),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  ccw_rotation: rotation,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional()
});
var pcb_circular_hole_with_rect_pad = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.literal("circular_hole_with_rect_pad"),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  hole_shape: z101.literal("circle"),
  pad_shape: z101.literal("rect"),
  hole_diameter: z101.number(),
  rect_pad_width: z101.number(),
  rect_pad_height: z101.number(),
  rect_border_radius: z101.number().optional(),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional(),
  rect_ccw_rotation: rotation.optional()
});
var pcb_pill_hole_with_rect_pad = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.literal("pill_hole_with_rect_pad"),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  hole_shape: z101.literal("pill"),
  pad_shape: z101.literal("rect"),
  hole_width: z101.number(),
  hole_height: z101.number(),
  rect_pad_width: z101.number(),
  rect_pad_height: z101.number(),
  rect_border_radius: z101.number().optional(),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional()
});
var pcb_rotated_pill_hole_with_rect_pad = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.literal("rotated_pill_hole_with_rect_pad"),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  hole_shape: z101.literal("rotated_pill"),
  pad_shape: z101.literal("rect"),
  hole_width: z101.number(),
  hole_height: z101.number(),
  hole_ccw_rotation: rotation,
  rect_pad_width: z101.number(),
  rect_pad_height: z101.number(),
  rect_border_radius: z101.number().optional(),
  rect_ccw_rotation: rotation,
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional()
});
var pcb_hole_with_polygon_pad = z101.object({
  type: z101.literal("pcb_plated_hole"),
  shape: z101.literal("hole_with_polygon_pad"),
  pcb_group_id: z101.string().optional(),
  subcircuit_id: z101.string().optional(),
  hole_shape: z101.enum(["circle", "oval", "pill", "rotated_pill"]),
  hole_diameter: z101.number().optional(),
  hole_width: z101.number().optional(),
  hole_height: z101.number().optional(),
  pad_outline: z101.array(
    z101.object({
      x: distance,
      y: distance
    })
  ).min(3),
  hole_offset_x: distance.default(0),
  hole_offset_y: distance.default(0),
  is_covered_with_solder_mask: z101.boolean().optional(),
  x: distance,
  y: distance,
  layers: z101.array(layer_ref),
  port_hints: z101.array(z101.string()).optional(),
  pcb_component_id: z101.string().optional(),
  pcb_port_id: z101.string().optional(),
  pcb_plated_hole_id: getZodPrefixedIdWithDefault("pcb_plated_hole"),
  soldermask_margin: z101.number().optional(),
  ccw_rotation: rotation.optional()
});
var pcb_plated_hole = z101.union([
  pcb_plated_hole_circle,
  pcb_plated_hole_oval,
  pcb_circular_hole_with_rect_pad,
  pcb_pill_hole_with_rect_pad,
  pcb_rotated_pill_hole_with_rect_pad,
  pcb_hole_with_polygon_pad
]);
expectTypesMatch(
  true
);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);

// src/pcb/pcb_port.ts
import { z as z102 } from "zod";
var pcb_port = z102.object({
  type: z102.literal("pcb_port"),
  pcb_port_id: getZodPrefixedIdWithDefault("pcb_port"),
  pcb_group_id: z102.string().optional(),
  subcircuit_id: z102.string().optional(),
  source_port_id: z102.string(),
  pcb_component_id: z102.string().optional(),
  x: distance,
  y: distance,
  layers: z102.array(layer_ref),
  is_board_pinout: z102.boolean().optional()
}).describe("Defines a port on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_smtpad.ts
import { z as z103 } from "zod";
var pcb_smtpad_circle = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("circle"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  x: distance,
  y: distance,
  radius: z103.number(),
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional()
});
var pcb_smtpad_rect = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("rect"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  x: distance,
  y: distance,
  width: z103.number(),
  height: z103.number(),
  rect_border_radius: z103.number().optional(),
  corner_radius: z103.number().optional(),
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional(),
  soldermask_margin_left: z103.number().optional(),
  soldermask_margin_top: z103.number().optional(),
  soldermask_margin_right: z103.number().optional(),
  soldermask_margin_bottom: z103.number().optional()
});
var pcb_smtpad_rotated_rect = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("rotated_rect"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  x: distance,
  y: distance,
  width: z103.number(),
  height: z103.number(),
  rect_border_radius: z103.number().optional(),
  corner_radius: z103.number().optional(),
  ccw_rotation: rotation,
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional(),
  soldermask_margin_left: z103.number().optional(),
  soldermask_margin_top: z103.number().optional(),
  soldermask_margin_right: z103.number().optional(),
  soldermask_margin_bottom: z103.number().optional()
});
var pcb_smtpad_pill = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("pill"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  x: distance,
  y: distance,
  width: z103.number(),
  height: z103.number(),
  radius: z103.number(),
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional()
});
var pcb_smtpad_rotated_pill = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("rotated_pill"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  x: distance,
  y: distance,
  width: z103.number(),
  height: z103.number(),
  radius: z103.number(),
  ccw_rotation: rotation,
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional()
});
var pcb_smtpad_polygon = z103.object({
  type: z103.literal("pcb_smtpad"),
  shape: z103.literal("polygon"),
  pcb_smtpad_id: getZodPrefixedIdWithDefault("pcb_smtpad"),
  pcb_group_id: z103.string().optional(),
  subcircuit_id: z103.string().optional(),
  points: z103.array(point),
  layer: layer_ref,
  port_hints: z103.array(z103.string()).optional(),
  pcb_component_id: z103.string().optional(),
  pcb_port_id: z103.string().optional(),
  is_covered_with_solder_mask: z103.boolean().optional(),
  soldermask_margin: z103.number().optional()
});
var pcb_smtpad = z103.discriminatedUnion("shape", [
  pcb_smtpad_circle,
  pcb_smtpad_rect,
  pcb_smtpad_rotated_rect,
  pcb_smtpad_rotated_pill,
  pcb_smtpad_pill,
  pcb_smtpad_polygon
]).describe("Defines an SMT pad on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);

// src/pcb/pcb_solder_paste.ts
import { z as z104 } from "zod";
var pcb_solder_paste_circle = z104.object({
  type: z104.literal("pcb_solder_paste"),
  shape: z104.literal("circle"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: z104.string().optional(),
  subcircuit_id: z104.string().optional(),
  x: distance,
  y: distance,
  radius: z104.number(),
  layer: layer_ref,
  pcb_component_id: z104.string().optional(),
  pcb_smtpad_id: z104.string().optional()
});
var pcb_solder_paste_rect = z104.object({
  type: z104.literal("pcb_solder_paste"),
  shape: z104.literal("rect"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: z104.string().optional(),
  subcircuit_id: z104.string().optional(),
  x: distance,
  y: distance,
  width: z104.number(),
  height: z104.number(),
  layer: layer_ref,
  pcb_component_id: z104.string().optional(),
  pcb_smtpad_id: z104.string().optional()
});
var pcb_solder_paste_pill = z104.object({
  type: z104.literal("pcb_solder_paste"),
  shape: z104.literal("pill"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: z104.string().optional(),
  subcircuit_id: z104.string().optional(),
  x: distance,
  y: distance,
  width: z104.number(),
  height: z104.number(),
  radius: z104.number(),
  layer: layer_ref,
  pcb_component_id: z104.string().optional(),
  pcb_smtpad_id: z104.string().optional()
});
var pcb_solder_paste_rotated_rect = z104.object({
  type: z104.literal("pcb_solder_paste"),
  shape: z104.literal("rotated_rect"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: z104.string().optional(),
  subcircuit_id: z104.string().optional(),
  x: distance,
  y: distance,
  width: z104.number(),
  height: z104.number(),
  ccw_rotation: distance,
  layer: layer_ref,
  pcb_component_id: z104.string().optional(),
  pcb_smtpad_id: z104.string().optional()
});
var pcb_solder_paste_oval = z104.object({
  type: z104.literal("pcb_solder_paste"),
  shape: z104.literal("oval"),
  pcb_solder_paste_id: getZodPrefixedIdWithDefault("pcb_solder_paste"),
  pcb_group_id: z104.string().optional(),
  subcircuit_id: z104.string().optional(),
  x: distance,
  y: distance,
  width: z104.number(),
  height: z104.number(),
  layer: layer_ref,
  pcb_component_id: z104.string().optional(),
  pcb_smtpad_id: z104.string().optional()
});
var pcb_solder_paste = z104.union([
  pcb_solder_paste_circle,
  pcb_solder_paste_rect,
  pcb_solder_paste_pill,
  pcb_solder_paste_rotated_rect,
  pcb_solder_paste_oval
]).describe("Defines solderpaste on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(
  true
);
expectTypesMatch(true);

// src/pcb/pcb_text.ts
import { z as z105 } from "zod";
var pcb_text = z105.object({
  type: z105.literal("pcb_text"),
  pcb_text_id: getZodPrefixedIdWithDefault("pcb_text"),
  pcb_group_id: z105.string().optional(),
  subcircuit_id: z105.string().optional(),
  text: z105.string(),
  center: point,
  layer: layer_ref,
  width: length,
  height: length,
  lines: z105.number(),
  // @ts-ignore
  align: z105.enum(["bottom-left"])
}).describe("Defines text on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_trace.ts
import { z as z106 } from "zod";
var pcb_trace_route_point_wire = z106.object({
  route_type: z106.literal("wire"),
  x: distance,
  y: distance,
  width: distance,
  copper_pour_id: z106.string().optional(),
  is_inside_copper_pour: z106.boolean().optional(),
  start_pcb_port_id: z106.string().optional(),
  end_pcb_port_id: z106.string().optional(),
  layer: layer_ref
});
var pcb_trace_route_point_via = z106.object({
  route_type: z106.literal("via"),
  x: distance,
  y: distance,
  copper_pour_id: z106.string().optional(),
  is_inside_copper_pour: z106.boolean().optional(),
  hole_diameter: distance.optional(),
  outer_diameter: distance.optional(),
  from_layer: layer_ref,
  to_layer: layer_ref
});
var pcb_trace_route_point_through_pad = z106.object({
  route_type: z106.literal("through_pad"),
  start: point,
  end: point,
  width: distance,
  start_layer: layer_ref,
  end_layer: layer_ref,
  pcb_smtpad_id: z106.string().optional(),
  pcb_plated_hole_id: z106.string().optional()
});
var pcb_trace_route_point = z106.union([
  pcb_trace_route_point_wire,
  pcb_trace_route_point_via,
  pcb_trace_route_point_through_pad
]);
var pcb_trace = z106.object({
  type: z106.literal("pcb_trace"),
  source_trace_id: z106.string().optional(),
  pcb_component_id: z106.string().optional(),
  pcb_trace_id: getZodPrefixedIdWithDefault("pcb_trace"),
  pcb_group_id: z106.string().optional(),
  subcircuit_id: z106.string().optional(),
  route_thickness_mode: z106.enum(["constant", "interpolated"]).default("constant").optional(),
  route_order_index: z106.number().optional(),
  should_round_corners: z106.boolean().optional(),
  trace_length: z106.number().optional(),
  highlight_color: z106.string().optional(),
  route: z106.array(pcb_trace_route_point)
}).describe("Defines a trace on the PCB");
expectTypesMatch(true);
expectTypesMatch(true);

// src/pcb/pcb_trace_warning.ts
import { z as z107 } from "zod";
var pcb_trace_warning = z107.object({
  type: z107.literal("pcb_trace_warning"),
  pcb_trace_warning_id: getZodPrefixedIdWithDefault("pcb_trace_warning"),
  warning_type: z107.literal("pcb_trace_warning").default("pcb_trace_warning"),
  message: z107.string(),
  center: point.optional(),
  pcb_trace_id: z107.string(),
  source_trace_id: z107.string(),
  pcb_component_ids: z107.array(z107.string()),
  pcb_port_ids: z107.array(z107.string()),
  subcircuit_id: z107.string().optional()
}).describe("Defines a trace warning on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_trace_too_long_warning.ts
import { z as z108 } from "zod";
var pcb_trace_too_long_warning = z108.object({
  type: z108.literal("pcb_trace_too_long_warning"),
  pcb_trace_too_long_warning_id: getZodPrefixedIdWithDefault(
    "pcb_trace_too_long_warning"
  ),
  warning_type: z108.literal("pcb_trace_too_long_warning").default("pcb_trace_too_long_warning"),
  message: z108.string(),
  pcb_trace_id: z108.string(),
  source_net_id: z108.string().optional(),
  source_trace_id: z108.string().optional(),
  actual_trace_length: distance,
  maximum_trace_length: distance,
  subcircuit_id: z108.string().optional()
}).describe(
  "Warning emitted when a PCB trace is longer than its maximum allowed length"
);
expectTypesMatch(true);

// src/pcb/pcb_trace_error.ts
import { z as z109 } from "zod";
var pcb_trace_error = base_circuit_json_error.extend({
  type: z109.literal("pcb_trace_error"),
  pcb_trace_error_id: getZodPrefixedIdWithDefault("pcb_trace_error"),
  error_type: z109.literal("pcb_trace_error").default("pcb_trace_error"),
  center: point.optional(),
  pcb_trace_id: z109.string(),
  source_trace_id: z109.string(),
  pcb_component_ids: z109.array(z109.string()),
  pcb_port_ids: z109.array(z109.string()),
  subcircuit_id: z109.string().optional()
}).describe("Defines a trace error on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_trace_missing_error.ts
import { z as z110 } from "zod";
var pcb_trace_missing_error = base_circuit_json_error.extend({
  type: z110.literal("pcb_trace_missing_error"),
  pcb_trace_missing_error_id: getZodPrefixedIdWithDefault(
    "pcb_trace_missing_error"
  ),
  error_type: z110.literal("pcb_trace_missing_error").default("pcb_trace_missing_error"),
  center: point.optional(),
  source_trace_id: z110.string(),
  pcb_component_ids: z110.array(z110.string()),
  pcb_port_ids: z110.array(z110.string()),
  subcircuit_id: z110.string().optional()
}).describe(
  "Defines an error when a source trace has no corresponding PCB trace"
);
expectTypesMatch(true);

// src/pcb/pcb_port_not_matched_error.ts
import { z as z111 } from "zod";
var pcb_port_not_matched_error = base_circuit_json_error.extend({
  type: z111.literal("pcb_port_not_matched_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: z111.literal("pcb_port_not_matched_error").default("pcb_port_not_matched_error"),
  pcb_component_ids: z111.array(z111.string()),
  subcircuit_id: z111.string().optional()
}).describe("Defines a trace error on the PCB where a port is not matched");
expectTypesMatch(true);

// src/pcb/pcb_port_not_connected_error.ts
import { z as z112 } from "zod";
var pcb_port_not_connected_error = base_circuit_json_error.extend({
  type: z112.literal("pcb_port_not_connected_error"),
  pcb_port_not_connected_error_id: getZodPrefixedIdWithDefault(
    "pcb_port_not_connected_error"
  ),
  error_type: z112.literal("pcb_port_not_connected_error").default("pcb_port_not_connected_error"),
  pcb_port_ids: z112.array(z112.string()),
  pcb_component_ids: z112.array(z112.string()),
  subcircuit_id: z112.string().optional()
}).describe("Defines an error when a pcb port is not connected to any trace");
expectTypesMatch(
  true
);

// src/pcb/pcb_net.ts
import { z as z113 } from "zod";
var pcb_net = z113.object({
  type: z113.literal("pcb_net"),
  pcb_net_id: getZodPrefixedIdWithDefault("pcb_net"),
  source_net_id: z113.string().optional(),
  highlight_color: z113.string().optional()
}).describe("Defines a net on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_via.ts
import { z as z114 } from "zod";
var pcb_via = z114.object({
  type: z114.literal("pcb_via"),
  pcb_via_id: getZodPrefixedIdWithDefault("pcb_via"),
  pcb_group_id: z114.string().optional(),
  subcircuit_id: z114.string().optional(),
  subcircuit_connectivity_map_key: z114.string().optional(),
  x: distance,
  y: distance,
  outer_diameter: distance.default("0.6mm"),
  hole_diameter: distance.default("0.25mm"),
  /** @deprecated */
  from_layer: layer_ref.optional(),
  /** @deprecated */
  to_layer: layer_ref.optional(),
  layers: z114.array(layer_ref),
  pcb_trace_id: z114.string().optional(),
  net_is_assignable: z114.boolean().optional(),
  net_assigned: z114.boolean().optional(),
  is_tented: z114.boolean().optional()
}).describe("Defines a via on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_board.ts
import { z as z115 } from "zod";
var pcb_board = z115.object({
  type: z115.literal("pcb_board"),
  pcb_board_id: getZodPrefixedIdWithDefault("pcb_board"),
  pcb_panel_id: z115.string().optional(),
  carrier_pcb_board_id: z115.string().optional(),
  is_subcircuit: z115.boolean().optional(),
  subcircuit_id: z115.string().optional(),
  is_mounted_to_carrier_board: z115.boolean().optional(),
  width: length.optional(),
  height: length.optional(),
  center: point,
  display_offset_x: z115.string().optional().describe(
    "How to display the x offset for this board, usually corresponding with how the user specified it"
  ),
  display_offset_y: z115.string().optional().describe(
    "How to display the y offset for this board, usually corresponding with how the user specified it"
  ),
  thickness: length.optional().default(1.4),
  num_layers: z115.number().optional().default(4),
  outline: z115.array(point).optional(),
  shape: z115.enum(["rect", "polygon"]).optional(),
  material: z115.enum(["fr4", "fr1"]).default("fr4"),
  solder_mask_color: z115.string().optional(),
  silkscreen_color: z115.string().optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.optional(),
  position_mode: z115.enum(["relative_to_panel_anchor", "none"]).optional()
}).merge(manufacturing_drc_properties).describe("Defines the board outline of the PCB");
expectTypesMatch(true);

// src/pcb/pcb_panel.ts
import { z as z116 } from "zod";
var pcb_panel = z116.object({
  type: z116.literal("pcb_panel"),
  pcb_panel_id: getZodPrefixedIdWithDefault("pcb_panel"),
  width: length,
  height: length,
  center: point,
  thickness: length.optional().default(1.4),
  covered_with_solder_mask: z116.boolean().optional().default(true)
}).describe("Defines a PCB panel that can contain multiple boards");
expectTypesMatch(true);

// src/pcb/pcb_placement_error.ts
import { z as z117 } from "zod";
var pcb_placement_error = base_circuit_json_error.extend({
  type: z117.literal("pcb_placement_error"),
  pcb_placement_error_id: getZodPrefixedIdWithDefault("pcb_placement_error"),
  error_type: z117.literal("pcb_placement_error").default("pcb_placement_error"),
  subcircuit_id: z117.string().optional()
}).describe("Defines a placement error on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_panelization_placement_error.ts
import { z as z118 } from "zod";
var pcb_panelization_placement_error = base_circuit_json_error.extend({
  type: z118.literal("pcb_panelization_placement_error"),
  pcb_panelization_placement_error_id: getZodPrefixedIdWithDefault(
    "pcb_panelization_placement_error"
  ),
  error_type: z118.literal("pcb_panelization_placement_error").default("pcb_panelization_placement_error"),
  pcb_panel_id: z118.string().optional(),
  pcb_board_id: z118.string().optional(),
  subcircuit_id: z118.string().optional()
}).describe("Defines a panelization placement error on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_trace_hint.ts
import { z as z119 } from "zod";
var pcb_trace_hint = z119.object({
  type: z119.literal("pcb_trace_hint"),
  pcb_trace_hint_id: getZodPrefixedIdWithDefault("pcb_trace_hint"),
  pcb_port_id: z119.string(),
  pcb_component_id: z119.string(),
  route: z119.array(route_hint_point),
  subcircuit_id: z119.string().optional()
}).describe("A hint that can be used during generation of a PCB trace");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_line.ts
import { z as z120 } from "zod";
var pcb_silkscreen_line = z120.object({
  type: z120.literal("pcb_silkscreen_line"),
  pcb_silkscreen_line_id: getZodPrefixedIdWithDefault("pcb_silkscreen_line"),
  pcb_component_id: z120.string(),
  pcb_group_id: z120.string().optional(),
  subcircuit_id: z120.string().optional(),
  stroke_width: distance.default("0.1mm"),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  layer: visible_layer
}).describe("Defines a silkscreen line on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_path.ts
import { z as z121 } from "zod";
var pcb_silkscreen_path = z121.object({
  type: z121.literal("pcb_silkscreen_path"),
  pcb_silkscreen_path_id: getZodPrefixedIdWithDefault("pcb_silkscreen_path"),
  pcb_component_id: z121.string(),
  pcb_group_id: z121.string().optional(),
  subcircuit_id: z121.string().optional(),
  layer: visible_layer,
  route: z121.array(point),
  stroke_width: length
}).describe("Defines a silkscreen path on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_text.ts
import { z as z122 } from "zod";
var pcb_silkscreen_text = z122.object({
  type: z122.literal("pcb_silkscreen_text"),
  pcb_silkscreen_text_id: getZodPrefixedIdWithDefault("pcb_silkscreen_text"),
  pcb_group_id: z122.string().optional(),
  subcircuit_id: z122.string().optional(),
  font: z122.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("0.2mm"),
  pcb_component_id: z122.string(),
  text: z122.string(),
  is_knockout: z122.boolean().default(false).optional(),
  knockout_padding: z122.object({
    left: length,
    top: length,
    bottom: length,
    right: length
  }).default({
    left: "0.2mm",
    top: "0.2mm",
    bottom: "0.2mm",
    right: "0.2mm"
  }).optional(),
  ccw_rotation: z122.number().optional(),
  layer: layer_ref,
  is_mirrored: z122.boolean().default(false).optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: ninePointAnchor.default("center")
}).describe("Defines silkscreen text on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_copper_text.ts
import { z as z123 } from "zod";
var pcb_copper_text = z123.object({
  type: z123.literal("pcb_copper_text"),
  pcb_copper_text_id: getZodPrefixedIdWithDefault("pcb_copper_text"),
  pcb_group_id: z123.string().optional(),
  subcircuit_id: z123.string().optional(),
  font: z123.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("0.2mm"),
  pcb_component_id: z123.string(),
  text: z123.string(),
  is_knockout: z123.boolean().default(false).optional(),
  knockout_padding: z123.object({
    left: length,
    top: length,
    bottom: length,
    right: length
  }).default({
    left: "0.2mm",
    top: "0.2mm",
    bottom: "0.2mm",
    right: "0.2mm"
  }).optional(),
  ccw_rotation: z123.number().optional(),
  layer: layer_ref,
  is_mirrored: z123.boolean().default(false).optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: ninePointAnchor.default("center")
}).describe("Defines copper text on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_rect.ts
import { z as z124 } from "zod";
var pcb_silkscreen_rect = z124.object({
  type: z124.literal("pcb_silkscreen_rect"),
  pcb_silkscreen_rect_id: getZodPrefixedIdWithDefault("pcb_silkscreen_rect"),
  pcb_component_id: z124.string(),
  pcb_group_id: z124.string().optional(),
  subcircuit_id: z124.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: layer_ref,
  stroke_width: length.default("1mm"),
  corner_radius: length.optional(),
  is_filled: z124.boolean().default(true).optional(),
  has_stroke: z124.boolean().optional(),
  is_stroke_dashed: z124.boolean().optional(),
  ccw_rotation: z124.number().optional()
}).describe("Defines a silkscreen rect on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_circle.ts
import { z as z125 } from "zod";
var pcb_silkscreen_circle = z125.object({
  type: z125.literal("pcb_silkscreen_circle"),
  pcb_silkscreen_circle_id: getZodPrefixedIdWithDefault(
    "pcb_silkscreen_circle"
  ),
  pcb_component_id: z125.string(),
  pcb_group_id: z125.string().optional(),
  subcircuit_id: z125.string().optional(),
  center: point,
  radius: length,
  layer: visible_layer,
  stroke_width: length.default("1mm"),
  is_filled: z125.boolean().optional()
}).describe("Defines a silkscreen circle on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_oval.ts
import { z as z126 } from "zod";
var pcb_silkscreen_oval = z126.object({
  type: z126.literal("pcb_silkscreen_oval"),
  pcb_silkscreen_oval_id: getZodPrefixedIdWithDefault("pcb_silkscreen_oval"),
  pcb_component_id: z126.string(),
  pcb_group_id: z126.string().optional(),
  subcircuit_id: z126.string().optional(),
  center: point,
  radius_x: distance,
  radius_y: distance,
  layer: visible_layer,
  ccw_rotation: rotation.optional()
}).describe("Defines a silkscreen oval on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_graphic.ts
import { z as z127 } from "zod";
var pcb_silkscreen_graphic_base = z127.object({
  type: z127.literal("pcb_silkscreen_graphic"),
  pcb_silkscreen_graphic_id: getZodPrefixedIdWithDefault(
    "pcb_silkscreen_graphic"
  ),
  pcb_component_id: z127.string(),
  pcb_group_id: z127.string().optional(),
  subcircuit_id: z127.string().optional(),
  layer: visible_layer,
  image_asset: asset.optional()
});
var pcb_silkscreen_graphic_brep = pcb_silkscreen_graphic_base.extend({
  shape: z127.literal("brep"),
  brep_shape
}).describe("Defines a BRep silkscreen graphic on the PCB");
expectTypesMatch(
  true
);
var pcb_silkscreen_graphic = z127.discriminatedUnion("shape", [pcb_silkscreen_graphic_brep]).describe("Defines a silkscreen graphic on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_silkscreen_pill.ts
import { z as z128 } from "zod";
var pcb_silkscreen_pill = z128.object({
  type: z128.literal("pcb_silkscreen_pill"),
  pcb_silkscreen_pill_id: getZodPrefixedIdWithDefault("pcb_silkscreen_pill"),
  pcb_component_id: z128.string(),
  pcb_group_id: z128.string().optional(),
  subcircuit_id: z128.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: layer_ref,
  ccw_rotation: z128.number().optional()
}).describe("Defines a silkscreen pill on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_fabrication_note_text.ts
import { z as z129 } from "zod";
var pcb_fabrication_note_text = z129.object({
  type: z129.literal("pcb_fabrication_note_text"),
  pcb_fabrication_note_text_id: getZodPrefixedIdWithDefault(
    "pcb_fabrication_note_text"
  ),
  subcircuit_id: z129.string().optional(),
  pcb_group_id: z129.string().optional(),
  font: z129.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("1mm"),
  pcb_component_id: z129.string(),
  text: z129.string(),
  ccw_rotation: z129.number().optional(),
  layer: visible_layer,
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: z129.enum(["center", "top_left", "top_right", "bottom_left", "bottom_right"]).default("center"),
  color: z129.string().optional()
}).describe(
  "Defines a fabrication note in text on the PCB, useful for leaving notes for assemblers or fabricators"
);
expectTypesMatch(true);

// src/pcb/pcb_fabrication_note_path.ts
import { z as z130 } from "zod";
var pcb_fabrication_note_path = z130.object({
  type: z130.literal("pcb_fabrication_note_path"),
  pcb_fabrication_note_path_id: getZodPrefixedIdWithDefault(
    "pcb_fabrication_note_path"
  ),
  pcb_component_id: z130.string(),
  subcircuit_id: z130.string().optional(),
  layer: layer_ref,
  route: z130.array(point),
  stroke_width: length,
  color: z130.string().optional()
}).describe(
  "Defines a fabrication path on the PCB for fabricators or assemblers"
);
expectTypesMatch(true);

// src/pcb/pcb_fabrication_note_rect.ts
import { z as z131 } from "zod";
var pcb_fabrication_note_rect = z131.object({
  type: z131.literal("pcb_fabrication_note_rect"),
  pcb_fabrication_note_rect_id: getZodPrefixedIdWithDefault(
    "pcb_fabrication_note_rect"
  ),
  pcb_component_id: z131.string(),
  pcb_group_id: z131.string().optional(),
  subcircuit_id: z131.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer,
  stroke_width: length.default("0.1mm"),
  corner_radius: length.optional(),
  is_filled: z131.boolean().optional(),
  has_stroke: z131.boolean().optional(),
  is_stroke_dashed: z131.boolean().optional(),
  color: z131.string().optional()
}).describe("Defines a fabrication note rectangle on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_fabrication_note_dimension.ts
import { z as z132 } from "zod";
var pcb_fabrication_note_dimension = z132.object({
  type: z132.literal("pcb_fabrication_note_dimension"),
  pcb_fabrication_note_dimension_id: getZodPrefixedIdWithDefault(
    "pcb_fabrication_note_dimension"
  ),
  pcb_component_id: z132.string(),
  pcb_group_id: z132.string().optional(),
  subcircuit_id: z132.string().optional(),
  layer: visible_layer,
  from: point,
  to: point,
  text: z132.string().optional(),
  text_ccw_rotation: z132.number().optional(),
  offset: length.optional(),
  offset_distance: length.optional(),
  offset_direction: z132.object({
    x: z132.number(),
    y: z132.number()
  }).optional(),
  font: z132.literal("tscircuit2024").default("tscircuit2024"),
  font_size: length.default("1mm"),
  color: z132.string().optional(),
  arrow_size: length.default("1mm")
}).describe("Defines a measurement annotation within PCB fabrication notes");
expectTypesMatch(true);

// src/pcb/pcb_note_text.ts
import { z as z133 } from "zod";
var pcb_note_text = z133.object({
  type: z133.literal("pcb_note_text"),
  pcb_note_text_id: getZodPrefixedIdWithDefault("pcb_note_text"),
  pcb_component_id: z133.string().optional(),
  pcb_group_id: z133.string().optional(),
  subcircuit_id: z133.string().optional(),
  name: z133.string().optional(),
  font: z133.literal("tscircuit2024").default("tscircuit2024"),
  font_size: distance.default("1mm"),
  text: z133.string().optional(),
  anchor_position: point.default({ x: 0, y: 0 }),
  anchor_alignment: z133.enum(["center", "top_left", "top_right", "bottom_left", "bottom_right"]).default("center"),
  layer: visible_layer.default("top"),
  is_mirrored_from_top_view: z133.boolean().optional(),
  color: z133.string().optional()
}).describe("Defines a documentation note in text on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_note_rect.ts
import { z as z134 } from "zod";
var pcb_note_rect = z134.object({
  type: z134.literal("pcb_note_rect"),
  pcb_note_rect_id: getZodPrefixedIdWithDefault("pcb_note_rect"),
  pcb_component_id: z134.string().optional(),
  pcb_group_id: z134.string().optional(),
  subcircuit_id: z134.string().optional(),
  name: z134.string().optional(),
  text: z134.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer.default("top"),
  stroke_width: length.default("0.1mm"),
  corner_radius: length.optional(),
  is_filled: z134.boolean().optional(),
  has_stroke: z134.boolean().optional(),
  is_stroke_dashed: z134.boolean().optional(),
  color: z134.string().optional()
}).describe("Defines a rectangular documentation note on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_note_path.ts
import { z as z135 } from "zod";
var pcb_note_path = z135.object({
  type: z135.literal("pcb_note_path"),
  pcb_note_path_id: getZodPrefixedIdWithDefault("pcb_note_path"),
  pcb_component_id: z135.string().optional(),
  pcb_group_id: z135.string().optional(),
  subcircuit_id: z135.string().optional(),
  name: z135.string().optional(),
  text: z135.string().optional(),
  route: z135.array(point),
  layer: visible_layer.default("top"),
  stroke_width: length.default("0.1mm"),
  color: z135.string().optional()
}).describe("Defines a polyline documentation note on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_note_line.ts
import { z as z136 } from "zod";
var pcb_note_line = z136.object({
  type: z136.literal("pcb_note_line"),
  pcb_note_line_id: getZodPrefixedIdWithDefault("pcb_note_line"),
  pcb_component_id: z136.string().optional(),
  pcb_group_id: z136.string().optional(),
  subcircuit_id: z136.string().optional(),
  name: z136.string().optional(),
  text: z136.string().optional(),
  x1: distance,
  y1: distance,
  x2: distance,
  y2: distance,
  layer: visible_layer.default("top"),
  stroke_width: distance.default("0.1mm"),
  color: z136.string().optional(),
  is_dashed: z136.boolean().optional()
}).describe("Defines a straight documentation note line on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_note_dimension.ts
import { z as z137 } from "zod";
var pcb_note_dimension = z137.object({
  type: z137.literal("pcb_note_dimension"),
  pcb_note_dimension_id: getZodPrefixedIdWithDefault("pcb_note_dimension"),
  pcb_component_id: z137.string().optional(),
  pcb_group_id: z137.string().optional(),
  subcircuit_id: z137.string().optional(),
  name: z137.string().optional(),
  from: point,
  to: point,
  text: z137.string().optional(),
  text_ccw_rotation: z137.number().optional(),
  offset_distance: length.optional(),
  offset_direction: z137.object({
    x: z137.number(),
    y: z137.number()
  }).optional(),
  font: z137.literal("tscircuit2024").default("tscircuit2024"),
  font_size: length.default("1mm"),
  layer: visible_layer.default("top"),
  color: z137.string().optional(),
  arrow_size: length.default("1mm")
}).describe("Defines a measurement annotation within PCB documentation notes");
expectTypesMatch(true);

// src/pcb/pcb_footprint_overlap_error.ts
import { z as z138 } from "zod";
var pcb_footprint_overlap_error = base_circuit_json_error.extend({
  type: z138.literal("pcb_footprint_overlap_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: z138.literal("pcb_footprint_overlap_error").default("pcb_footprint_overlap_error"),
  pcb_smtpad_ids: z138.array(z138.string()).optional(),
  pcb_plated_hole_ids: z138.array(z138.string()).optional(),
  pcb_hole_ids: z138.array(z138.string()).optional(),
  pcb_keepout_ids: z138.array(z138.string()).optional()
}).describe("Error emitted when a pcb footprint overlaps with another element");
expectTypesMatch(
  true
);

// src/pcb/pcb_courtyard_overlap_error.ts
import { z as z139 } from "zod";
var pcb_courtyard_overlap_error = base_circuit_json_error.extend({
  type: z139.literal("pcb_courtyard_overlap_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: z139.literal("pcb_courtyard_overlap_error").default("pcb_courtyard_overlap_error"),
  pcb_component_ids: z139.tuple([z139.string(), z139.string()])
}).describe(
  "Error emitted when the courtyard (CrtYd) of one PCB component overlaps with the courtyard of another"
);
expectTypesMatch(
  true
);

// src/pcb/pcb_keepout.ts
import { z as z140 } from "zod";
var pcb_keepout = z140.object({
  type: z140.literal("pcb_keepout"),
  shape: z140.literal("rect"),
  pcb_group_id: z140.string().optional(),
  subcircuit_id: z140.string().optional(),
  center: point,
  width: distance,
  height: distance,
  pcb_keepout_id: z140.string(),
  layers: z140.array(z140.string()),
  // Specify layers where the keepout applies
  description: z140.string().optional()
  // Optional description of the keepout
}).or(
  z140.object({
    type: z140.literal("pcb_keepout"),
    shape: z140.literal("circle"),
    pcb_group_id: z140.string().optional(),
    subcircuit_id: z140.string().optional(),
    center: point,
    radius: distance,
    pcb_keepout_id: z140.string(),
    layers: z140.array(z140.string()),
    // Specify layers where the keepout applies
    description: z140.string().optional()
    // Optional description of the keepout
  })
);
expectTypesMatch(true);

// src/pcb/pcb_cutout.ts
import { z as z141 } from "zod";
var pcb_cutout_base = z141.object({
  type: z141.literal("pcb_cutout"),
  pcb_cutout_id: getZodPrefixedIdWithDefault("pcb_cutout"),
  pcb_group_id: z141.string().optional(),
  subcircuit_id: z141.string().optional(),
  pcb_board_id: z141.string().optional(),
  pcb_panel_id: z141.string().optional()
});
var pcb_cutout_rect = pcb_cutout_base.extend({
  shape: z141.literal("rect"),
  center: point,
  width: length,
  height: length,
  rotation: rotation.optional(),
  corner_radius: length.optional()
});
expectTypesMatch(true);
var pcb_cutout_circle = pcb_cutout_base.extend({
  shape: z141.literal("circle"),
  center: point,
  radius: length
});
expectTypesMatch(true);
var pcb_cutout_polygon = pcb_cutout_base.extend({
  shape: z141.literal("polygon"),
  points: z141.array(point)
});
expectTypesMatch(true);
var pcb_cutout_path = pcb_cutout_base.extend({
  shape: z141.literal("path"),
  route: z141.array(point),
  slot_width: length,
  slot_length: length.optional(),
  space_between_slots: length.optional(),
  slot_corner_radius: length.optional()
});
expectTypesMatch(true);
var pcb_cutout = z141.discriminatedUnion("shape", [
  pcb_cutout_rect,
  pcb_cutout_circle,
  pcb_cutout_polygon,
  pcb_cutout_path
]).describe("Defines a cutout on the PCB, removing board material.");
expectTypesMatch(true);

// src/pcb/pcb_missing_footprint_error.ts
import { z as z142 } from "zod";
var pcb_missing_footprint_error = base_circuit_json_error.extend({
  type: z142.literal("pcb_missing_footprint_error"),
  pcb_missing_footprint_error_id: getZodPrefixedIdWithDefault(
    "pcb_missing_footprint_error"
  ),
  pcb_group_id: z142.string().optional(),
  subcircuit_id: z142.string().optional(),
  error_type: z142.literal("pcb_missing_footprint_error").default("pcb_missing_footprint_error"),
  source_component_id: z142.string()
}).describe("Defines a missing footprint error on the PCB");
expectTypesMatch(
  true
);

// src/pcb/external_footprint_load_error.ts
import { z as z143 } from "zod";
var external_footprint_load_error = base_circuit_json_error.extend({
  type: z143.literal("external_footprint_load_error"),
  external_footprint_load_error_id: getZodPrefixedIdWithDefault(
    "external_footprint_load_error"
  ),
  pcb_component_id: z143.string(),
  source_component_id: z143.string(),
  pcb_group_id: z143.string().optional(),
  subcircuit_id: z143.string().optional(),
  footprinter_string: z143.string().optional(),
  error_type: z143.literal("external_footprint_load_error").default("external_footprint_load_error")
}).describe("Defines an error when an external footprint fails to load");
expectTypesMatch(true);

// src/pcb/circuit_json_footprint_load_error.ts
import { z as z144 } from "zod";
var circuit_json_footprint_load_error = base_circuit_json_error.extend({
  type: z144.literal("circuit_json_footprint_load_error"),
  circuit_json_footprint_load_error_id: getZodPrefixedIdWithDefault(
    "circuit_json_footprint_load_error"
  ),
  pcb_component_id: z144.string(),
  source_component_id: z144.string(),
  pcb_group_id: z144.string().optional(),
  subcircuit_id: z144.string().optional(),
  error_type: z144.literal("circuit_json_footprint_load_error").default("circuit_json_footprint_load_error"),
  circuit_json: z144.array(z144.any()).optional()
}).describe("Defines an error when a circuit JSON footprint fails to load");
expectTypesMatch(true);

// src/pcb/pcb_group.ts
import { z as z145 } from "zod";
var pcb_group = z145.object({
  type: z145.literal("pcb_group"),
  pcb_group_id: getZodPrefixedIdWithDefault("pcb_group"),
  source_group_id: z145.string(),
  is_subcircuit: z145.boolean().optional(),
  subcircuit_id: z145.string().optional(),
  width: length.optional(),
  height: length.optional(),
  center: point,
  display_offset_x: z145.string().optional().describe(
    "How to display the x offset for this group, usually corresponding with how the user specified it"
  ),
  display_offset_y: z145.string().optional().describe(
    "How to display the y offset for this group, usually corresponding with how the user specified it"
  ),
  outline: z145.array(point).optional(),
  anchor_position: point.optional(),
  anchor_alignment: ninePointAnchor.default("center"),
  position_mode: z145.enum(["packed", "relative_to_group_anchor", "none"]).optional(),
  positioned_relative_to_pcb_group_id: z145.string().optional(),
  positioned_relative_to_pcb_board_id: z145.string().optional(),
  pcb_component_ids: z145.array(z145.string()),
  child_layout_mode: z145.enum(["packed", "none"]).optional(),
  name: z145.string().optional(),
  description: z145.string().optional(),
  layout_mode: z145.string().optional(),
  autorouter_configuration: z145.object({
    trace_clearance: length
  }).optional(),
  autorouter_used_string: z145.string().optional()
}).describe("Defines a group of components on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_autorouting_error.ts
import { z as z146 } from "zod";
var pcb_autorouting_error = base_circuit_json_error.extend({
  type: z146.literal("pcb_autorouting_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_autorouting_error"),
  error_type: z146.literal("pcb_autorouting_error").default("pcb_autorouting_error"),
  subcircuit_id: z146.string().optional()
}).describe("The autorouting has failed to route a portion of the board");
expectTypesMatch(true);

// src/pcb/pcb_manual_edit_conflict_warning.ts
import { z as z147 } from "zod";
var pcb_manual_edit_conflict_warning = z147.object({
  type: z147.literal("pcb_manual_edit_conflict_warning"),
  pcb_manual_edit_conflict_warning_id: getZodPrefixedIdWithDefault(
    "pcb_manual_edit_conflict_warning"
  ),
  warning_type: z147.literal("pcb_manual_edit_conflict_warning").default("pcb_manual_edit_conflict_warning"),
  message: z147.string(),
  pcb_component_id: z147.string(),
  pcb_group_id: z147.string().optional(),
  subcircuit_id: z147.string().optional(),
  source_component_id: z147.string()
}).describe(
  "Warning emitted when a component has both manual placement and explicit pcbX/pcbY coordinates"
);
expectTypesMatch(true);

// src/pcb/pcb_connector_not_in_accessible_orientation_warning.ts
import { z as z148 } from "zod";
var connectorOrientationDirection = z148.enum(["x-", "x+", "y+", "y-"]);
var pcb_connector_not_in_accessible_orientation_warning = z148.object({
  type: z148.literal("pcb_connector_not_in_accessible_orientation_warning"),
  pcb_connector_not_in_accessible_orientation_warning_id: getZodPrefixedIdWithDefault(
    "pcb_connector_not_in_accessible_orientation_warning"
  ),
  warning_type: z148.literal("pcb_connector_not_in_accessible_orientation_warning").default("pcb_connector_not_in_accessible_orientation_warning"),
  message: z148.string(),
  pcb_component_id: z148.string(),
  source_component_id: z148.string().optional(),
  pcb_board_id: z148.string().optional(),
  facing_direction: connectorOrientationDirection,
  recommended_facing_direction: connectorOrientationDirection,
  subcircuit_id: z148.string().optional()
}).describe(
  "Warning emitted when a connector PCB component is facing inward toward the board and should be reoriented to an outward-facing direction"
);
expectTypesMatch(true);

// src/pcb/supplier_footprint_mismatch_warning.ts
import { z as z149 } from "zod";
var supplier_footprint_mismatch_warning = z149.object({
  type: z149.literal("supplier_footprint_mismatch_warning"),
  supplier_footprint_mismatch_warning_id: getZodPrefixedIdWithDefault(
    "supplier_footprint_mismatch_warning"
  ),
  warning_type: z149.literal("supplier_footprint_mismatch_warning").default("supplier_footprint_mismatch_warning"),
  message: z149.string(),
  source_component_id: z149.string(),
  pcb_component_id: z149.string().optional(),
  pcb_group_id: z149.string().optional(),
  subcircuit_id: z149.string().optional(),
  supplier_name: supplier_name.optional(),
  supplier_part_number: z149.string().optional(),
  supplier_footprint_url: z149.string().optional(),
  footprint_copper_intersection_over_union: z149.number()
}).describe(
  "Warning emitted when a supplier part footprint does not match the expected footprint"
);
expectTypesMatch(true);

// src/pcb/pcb_breakout_point.ts
import { z as z150 } from "zod";
var pcb_breakout_point = z150.object({
  type: z150.literal("pcb_breakout_point"),
  pcb_breakout_point_id: getZodPrefixedIdWithDefault("pcb_breakout_point"),
  pcb_group_id: z150.string(),
  subcircuit_id: z150.string().optional(),
  source_trace_id: z150.string().optional(),
  source_port_id: z150.string().optional(),
  source_net_id: z150.string().optional(),
  x: distance,
  y: distance
}).describe(
  "Defines a routing target within a pcb_group for a source_trace or source_net"
);
expectTypesMatch(true);

// src/pcb/pcb_ground_plane.ts
import { z as z151 } from "zod";
var pcb_ground_plane = z151.object({
  type: z151.literal("pcb_ground_plane"),
  pcb_ground_plane_id: getZodPrefixedIdWithDefault("pcb_ground_plane"),
  source_pcb_ground_plane_id: z151.string(),
  source_net_id: z151.string(),
  pcb_group_id: z151.string().optional(),
  subcircuit_id: z151.string().optional()
}).describe("Defines a ground plane on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_ground_plane_region.ts
import { z as z152 } from "zod";
var pcb_ground_plane_region = z152.object({
  type: z152.literal("pcb_ground_plane_region"),
  pcb_ground_plane_region_id: getZodPrefixedIdWithDefault(
    "pcb_ground_plane_region"
  ),
  pcb_ground_plane_id: z152.string(),
  pcb_group_id: z152.string().optional(),
  subcircuit_id: z152.string().optional(),
  layer: layer_ref,
  points: z152.array(point)
}).describe("Defines a polygon region of a ground plane");
expectTypesMatch(true);

// src/pcb/pcb_thermal_spoke.ts
import { z as z153 } from "zod";
var pcb_thermal_spoke = z153.object({
  type: z153.literal("pcb_thermal_spoke"),
  pcb_thermal_spoke_id: getZodPrefixedIdWithDefault("pcb_thermal_spoke"),
  pcb_ground_plane_id: z153.string(),
  shape: z153.string(),
  spoke_count: z153.number(),
  spoke_thickness: distance,
  spoke_inner_diameter: distance,
  spoke_outer_diameter: distance,
  pcb_plated_hole_id: z153.string().optional(),
  subcircuit_id: z153.string().optional()
}).describe("Pattern for connecting a ground plane to a plated hole");
expectTypesMatch(true);

// src/pcb/pcb_copper_pour.ts
import { z as z154 } from "zod";
var pcb_copper_pour_base = z154.object({
  type: z154.literal("pcb_copper_pour"),
  pcb_copper_pour_id: getZodPrefixedIdWithDefault("pcb_copper_pour"),
  pcb_group_id: z154.string().optional(),
  subcircuit_id: z154.string().optional(),
  layer: layer_ref,
  source_net_id: z154.string().optional(),
  covered_with_solder_mask: z154.boolean().optional().default(true)
});
var pcb_copper_pour_rect = pcb_copper_pour_base.extend({
  shape: z154.literal("rect"),
  center: point,
  width: length,
  height: length,
  rotation: rotation.optional()
});
expectTypesMatch(true);
var pcb_copper_pour_brep = pcb_copper_pour_base.extend({
  shape: z154.literal("brep"),
  brep_shape
});
expectTypesMatch(true);
var pcb_copper_pour_polygon = pcb_copper_pour_base.extend({
  shape: z154.literal("polygon"),
  points: z154.array(point)
});
expectTypesMatch(true);
var pcb_copper_pour = z154.discriminatedUnion("shape", [
  pcb_copper_pour_rect,
  pcb_copper_pour_brep,
  pcb_copper_pour_polygon
]).describe("Defines a copper pour on the PCB.");
expectTypesMatch(true);

// src/pcb/pcb_component_outside_board_error.ts
import { z as z155 } from "zod";
var pcb_component_outside_board_error = base_circuit_json_error.extend({
  type: z155.literal("pcb_component_outside_board_error"),
  pcb_component_outside_board_error_id: getZodPrefixedIdWithDefault(
    "pcb_component_outside_board_error"
  ),
  error_type: z155.literal("pcb_component_outside_board_error").default("pcb_component_outside_board_error"),
  pcb_component_id: z155.string(),
  pcb_board_id: z155.string(),
  component_center: point,
  component_bounds: z155.object({
    min_x: z155.number(),
    max_x: z155.number(),
    min_y: z155.number(),
    max_y: z155.number()
  }),
  subcircuit_id: z155.string().optional(),
  source_component_id: z155.string().optional()
}).describe(
  "Error emitted when a PCB component is placed outside the board boundaries"
);
expectTypesMatch(true);

// src/pcb/pcb_component_not_on_board_edge_error.ts
import { z as z156 } from "zod";
var pcb_component_not_on_board_edge_error = base_circuit_json_error.extend({
  type: z156.literal("pcb_component_not_on_board_edge_error"),
  pcb_component_not_on_board_edge_error_id: getZodPrefixedIdWithDefault(
    "pcb_component_not_on_board_edge_error"
  ),
  error_type: z156.literal("pcb_component_not_on_board_edge_error").default("pcb_component_not_on_board_edge_error"),
  pcb_component_id: z156.string(),
  pcb_board_id: z156.string(),
  component_center: point,
  pad_to_nearest_board_edge_distance: z156.number(),
  source_component_id: z156.string().optional(),
  subcircuit_id: z156.string().optional()
}).describe(
  "Error emitted when a component that must be placed on the board edge is centered away from the edge"
);
expectTypesMatch(true);

// src/pcb/pcb_component_invalid_layer_error.ts
import { z as z157 } from "zod";
var pcb_component_invalid_layer_error = base_circuit_json_error.extend({
  type: z157.literal("pcb_component_invalid_layer_error"),
  pcb_component_invalid_layer_error_id: getZodPrefixedIdWithDefault(
    "pcb_component_invalid_layer_error"
  ),
  error_type: z157.literal("pcb_component_invalid_layer_error").default("pcb_component_invalid_layer_error"),
  pcb_component_id: z157.string().optional(),
  source_component_id: z157.string(),
  layer: layer_ref,
  subcircuit_id: z157.string().optional()
}).describe(
  "Error emitted when a component is placed on an invalid layer (components can only be on 'top' or 'bottom' layers)"
);
expectTypesMatch(true);

// src/pcb/pcb_via_clearance_error.ts
import { z as z158 } from "zod";
var pcb_via_clearance_error = base_circuit_json_error.extend({
  type: z158.literal("pcb_via_clearance_error"),
  pcb_error_id: getZodPrefixedIdWithDefault("pcb_error"),
  error_type: z158.literal("pcb_via_clearance_error").default("pcb_via_clearance_error"),
  pcb_via_ids: z158.array(z158.string()).min(2),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  pcb_center: z158.object({
    x: z158.number().optional(),
    y: z158.number().optional()
  }).optional(),
  subcircuit_id: z158.string().optional()
}).describe("Error emitted when vias are closer than the allowed clearance");
expectTypesMatch(true);

// src/pcb/pcb_via_trace_clearance_error.ts
import { z as z159 } from "zod";
var pcb_via_trace_clearance_error = base_circuit_json_error.extend({
  type: z159.literal("pcb_via_trace_clearance_error"),
  pcb_via_trace_clearance_error_id: getZodPrefixedIdWithDefault(
    "pcb_via_trace_clearance_error"
  ),
  error_type: z159.literal("pcb_via_trace_clearance_error").default("pcb_via_trace_clearance_error"),
  pcb_via_id: z159.string(),
  pcb_trace_id: z159.string(),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: z159.object({
    x: z159.number().optional(),
    y: z159.number().optional()
  }).optional(),
  subcircuit_id: z159.string().optional()
}).describe(
  "Error emitted when a via and trace are closer than the allowed clearance"
);
expectTypesMatch(
  true
);

// src/pcb/pcb_pad_pad_clearance_error.ts
import { z as z160 } from "zod";
var pcb_pad_pad_clearance_error = base_circuit_json_error.extend({
  type: z160.literal("pcb_pad_pad_clearance_error"),
  pcb_pad_pad_clearance_error_id: getZodPrefixedIdWithDefault(
    "pcb_pad_pad_clearance_error"
  ),
  error_type: z160.literal("pcb_pad_pad_clearance_error").default("pcb_pad_pad_clearance_error"),
  pcb_pad_ids: z160.array(z160.string()).min(2),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: z160.object({
    x: z160.number().optional(),
    y: z160.number().optional()
  }).optional(),
  subcircuit_id: z160.string().optional()
}).describe("Error emitted when pads are closer than the allowed clearance");
expectTypesMatch(true);

// src/pcb/pcb_pad_trace_clearance_error.ts
import { z as z161 } from "zod";
var pcb_pad_trace_clearance_error = base_circuit_json_error.extend({
  type: z161.literal("pcb_pad_trace_clearance_error"),
  pcb_pad_trace_clearance_error_id: getZodPrefixedIdWithDefault(
    "pcb_pad_trace_clearance_error"
  ),
  error_type: z161.literal("pcb_pad_trace_clearance_error").default("pcb_pad_trace_clearance_error"),
  pcb_pad_id: z161.string(),
  pcb_trace_id: z161.string(),
  minimum_clearance: distance.optional(),
  actual_clearance: distance.optional(),
  center: z161.object({
    x: z161.number().optional(),
    y: z161.number().optional()
  }).optional(),
  subcircuit_id: z161.string().optional()
}).describe(
  "Error emitted when a pad and trace are closer than allowed clearance"
);
expectTypesMatch(
  true
);

// src/pcb/pcb_courtyard_rect.ts
import { z as z162 } from "zod";
var pcb_courtyard_rect = z162.object({
  type: z162.literal("pcb_courtyard_rect"),
  pcb_courtyard_rect_id: getZodPrefixedIdWithDefault("pcb_courtyard_rect"),
  pcb_component_id: z162.string(),
  pcb_group_id: z162.string().optional(),
  subcircuit_id: z162.string().optional(),
  center: point,
  width: length,
  height: length,
  layer: visible_layer,
  ccw_rotation: rotation.optional(),
  color: z162.string().optional()
}).describe("Defines a courtyard rectangle on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_courtyard_outline.ts
import { z as z163 } from "zod";
var pcb_courtyard_outline = z163.object({
  type: z163.literal("pcb_courtyard_outline"),
  pcb_courtyard_outline_id: getZodPrefixedIdWithDefault(
    "pcb_courtyard_outline"
  ),
  pcb_component_id: z163.string(),
  pcb_group_id: z163.string().optional(),
  subcircuit_id: z163.string().optional(),
  layer: visible_layer,
  outline: z163.array(point).min(2)
}).describe("Defines a courtyard outline on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_courtyard_polygon.ts
import { z as z164 } from "zod";
var pcb_courtyard_polygon = z164.object({
  type: z164.literal("pcb_courtyard_polygon"),
  pcb_courtyard_polygon_id: getZodPrefixedIdWithDefault(
    "pcb_courtyard_polygon"
  ),
  pcb_component_id: z164.string(),
  pcb_group_id: z164.string().optional(),
  subcircuit_id: z164.string().optional(),
  layer: visible_layer,
  points: z164.array(point).min(3),
  color: z164.string().optional()
}).describe("Defines a courtyard polygon on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_courtyard_circle.ts
import { z as z165 } from "zod";
var pcb_courtyard_circle = z165.object({
  type: z165.literal("pcb_courtyard_circle"),
  pcb_courtyard_circle_id: getZodPrefixedIdWithDefault(
    "pcb_courtyard_circle"
  ),
  pcb_component_id: z165.string(),
  pcb_group_id: z165.string().optional(),
  subcircuit_id: z165.string().optional(),
  center: point,
  radius: length,
  layer: visible_layer,
  color: z165.string().optional()
}).describe("Defines a courtyard circle on the PCB");
expectTypesMatch(true);

// src/pcb/pcb_courtyard_pill.ts
import { z as z166 } from "zod";
var pcb_courtyard_pill = z166.object({
  type: z166.literal("pcb_courtyard_pill"),
  pcb_courtyard_pill_id: getZodPrefixedIdWithDefault("pcb_courtyard_pill"),
  pcb_component_id: z166.string(),
  pcb_group_id: z166.string().optional(),
  subcircuit_id: z166.string().optional(),
  center: point,
  width: length,
  height: length,
  radius: length,
  layer: visible_layer,
  color: z166.string().optional()
}).describe("Defines a courtyard pill on the PCB");
expectTypesMatch(true);

// src/cad/cad_component.ts
import { z as z167 } from "zod";

// src/cad/cad_model_conventions.ts
var cad_model_formats = [
  "obj",
  "stl",
  "3mf",
  "gltf",
  "glb",
  "step",
  "wrl"
];
var cad_model_axis_directions = [
  "x+",
  "x-",
  "y+",
  "y-",
  "z+",
  "z-"
];
var cadModelDefaultDirectionMap = {
  obj: "z+",
  stl: "z+",
  "3mf": "z+",
  gltf: "y+",
  glb: "y+",
  step: "z+",
  wrl: "y+"
};

// src/cad/cad_component.ts
var cad_component = z167.object({
  type: z167.literal("cad_component"),
  cad_component_id: z167.string(),
  pcb_component_id: z167.string(),
  source_component_id: z167.string(),
  position: point3,
  rotation: point3.optional(),
  size: point3.optional(),
  layer: layer_ref.optional(),
  subcircuit_id: z167.string().optional(),
  // These are all ways to generate/load the 3d model
  footprinter_string: z167.string().optional(),
  model_obj_url: z167.string().optional(),
  model_stl_url: z167.string().optional(),
  model_3mf_url: z167.string().optional(),
  model_gltf_url: z167.string().optional(),
  model_glb_url: z167.string().optional(),
  model_step_url: z167.string().optional(),
  model_wrl_url: z167.string().optional(),
  model_asset: asset.optional(),
  model_unit_to_mm_scale_factor: z167.number().optional(),
  model_board_normal_direction: z167.enum(cad_model_axis_directions).optional().describe(
    `The direction in the model's coordinate space that is considered "up" or "coming out of the board surface"`
  ),
  model_origin_position: point3.optional(),
  model_origin_alignment: z167.enum([
    "unknown",
    "center",
    "center_of_component_on_board_surface",
    "bottom_center_of_component"
  ]).optional(),
  model_object_fit: z167.enum(["contain_within_bounds", "fill_bounds"]).optional().default("contain_within_bounds"),
  model_jscad: z167.any().optional(),
  show_as_translucent_model: z167.boolean().optional(),
  show_as_bounding_box: z167.boolean().optional(),
  anchor_alignment: z167.enum(["center", "center_of_component_on_board_surface"]).optional().default("center")
}).describe("Defines a component on the PCB");
expectTypesMatch(true);

// src/simulation/simulation_voltage_source.ts
import { z as z168 } from "zod";
var wave_shape = z168.enum(["sinewave", "square", "triangle", "sawtooth"]);
var percentage = z168.union([z168.string(), z168.number()]).transform((val) => {
  if (typeof val === "string") {
    if (val.endsWith("%")) {
      return parseFloat(val.slice(0, -1)) / 100;
    }
    return parseFloat(val);
  }
  return val;
}).pipe(
  z168.number().min(0, "Duty cycle must be non-negative").max(1, "Duty cycle cannot be greater than 100%")
);
var simulation_dc_voltage_source = z168.object({
  type: z168.literal("simulation_voltage_source"),
  simulation_voltage_source_id: getZodPrefixedIdWithDefault(
    "simulation_voltage_source"
  ),
  is_dc_source: z168.literal(true).optional().default(true),
  positive_source_port_id: z168.string().optional(),
  negative_source_port_id: z168.string().optional(),
  positive_source_net_id: z168.string().optional(),
  negative_source_net_id: z168.string().optional(),
  voltage
}).describe("Defines a DC voltage source for simulation");
var simulation_ac_voltage_source = z168.object({
  type: z168.literal("simulation_voltage_source"),
  simulation_voltage_source_id: getZodPrefixedIdWithDefault(
    "simulation_voltage_source"
  ),
  is_dc_source: z168.literal(false),
  terminal1_source_port_id: z168.string().optional(),
  terminal2_source_port_id: z168.string().optional(),
  terminal1_source_net_id: z168.string().optional(),
  terminal2_source_net_id: z168.string().optional(),
  voltage: voltage.optional(),
  frequency: frequency.optional(),
  peak_to_peak_voltage: voltage.optional(),
  wave_shape: wave_shape.optional(),
  phase: rotation.optional(),
  duty_cycle: percentage.optional(),
  pulse_delay: ms.optional(),
  rise_time: ms.optional(),
  fall_time: ms.optional(),
  pulse_width: ms.optional(),
  period: ms.optional()
}).describe("Defines an AC voltage source for simulation");
var simulation_voltage_source = z168.union([simulation_dc_voltage_source, simulation_ac_voltage_source]).describe("Defines a voltage source for simulation");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);

// src/simulation/simulation_current_source.ts
import { z as z169 } from "zod";
var percentage2 = z169.union([z169.string(), z169.number()]).transform((val) => {
  if (typeof val === "string") {
    if (val.endsWith("%")) {
      return parseFloat(val.slice(0, -1)) / 100;
    }
    return parseFloat(val);
  }
  return val;
}).pipe(
  z169.number().min(0, "Duty cycle must be non-negative").max(1, "Duty cycle cannot be greater than 100%")
);
var simulation_dc_current_source = z169.object({
  type: z169.literal("simulation_current_source"),
  simulation_current_source_id: getZodPrefixedIdWithDefault(
    "simulation_current_source"
  ),
  is_dc_source: z169.literal(true).optional().default(true),
  positive_source_port_id: z169.string().optional(),
  negative_source_port_id: z169.string().optional(),
  positive_source_net_id: z169.string().optional(),
  negative_source_net_id: z169.string().optional(),
  current
}).describe("Defines a DC current source for simulation");
var simulation_ac_current_source = z169.object({
  type: z169.literal("simulation_current_source"),
  simulation_current_source_id: getZodPrefixedIdWithDefault(
    "simulation_current_source"
  ),
  is_dc_source: z169.literal(false),
  terminal1_source_port_id: z169.string().optional(),
  terminal2_source_port_id: z169.string().optional(),
  terminal1_source_net_id: z169.string().optional(),
  terminal2_source_net_id: z169.string().optional(),
  current: current.optional(),
  frequency: frequency.optional(),
  peak_to_peak_current: current.optional(),
  wave_shape: wave_shape.optional(),
  phase: rotation.optional(),
  duty_cycle: percentage2.optional()
}).describe("Defines an AC current source for simulation");
var simulation_current_source = z169.union([simulation_dc_current_source, simulation_ac_current_source]).describe("Defines a current source for simulation");
expectTypesMatch(true);
expectTypesMatch(true);
expectTypesMatch(true);

// src/simulation/simulation_experiment.ts
import { z as z170 } from "zod";
var experiment_type = z170.union([
  z170.literal("spice_dc_sweep"),
  z170.literal("spice_dc_operating_point"),
  z170.literal("spice_transient_analysis"),
  z170.literal("spice_ac_analysis")
]);
var spice_simulation_options = z170.object({
  method: z170.enum(["trap", "gear"]).optional(),
  reltol: z170.union([z170.number(), z170.string()]).optional(),
  abstol: z170.union([z170.number(), z170.string()]).optional(),
  vntol: z170.union([z170.number(), z170.string()]).optional()
}).describe("SPICE solver options for a simulation experiment");
var simulation_experiment = z170.object({
  type: z170.literal("simulation_experiment"),
  simulation_experiment_id: getZodPrefixedIdWithDefault(
    "simulation_experiment"
  ),
  name: z170.string(),
  experiment_type,
  time_per_step: duration_ms.optional(),
  start_time_ms: ms.optional(),
  end_time_ms: ms.optional(),
  spice_options: spice_simulation_options.optional()
}).describe("Defines a simulation experiment configuration");
expectTypesMatch(true);

// src/simulation/simulation_transient_voltage_graph.ts
import { z as z171 } from "zod";
var simulation_transient_voltage_graph = z171.object({
  type: z171.literal("simulation_transient_voltage_graph"),
  simulation_transient_voltage_graph_id: getZodPrefixedIdWithDefault(
    "simulation_transient_voltage_graph"
  ),
  simulation_experiment_id: z171.string(),
  timestamps_ms: z171.array(z171.number()).optional(),
  voltage_levels: z171.array(z171.number()),
  source_component_id: z171.string().optional(),
  subcircuit_connectivity_map_key: z171.string().optional(),
  time_per_step: duration_ms,
  start_time_ms: ms,
  end_time_ms: ms,
  name: z171.string().optional(),
  color: z171.string().optional()
}).describe("Stores voltage measurements over time for a simulation");
expectTypesMatch(true);

// src/simulation/simulation_transient_current_graph.ts
import { z as z172 } from "zod";
var simulation_transient_current_graph = z172.object({
  type: z172.literal("simulation_transient_current_graph"),
  simulation_transient_current_graph_id: getZodPrefixedIdWithDefault(
    "simulation_transient_current_graph"
  ),
  simulation_experiment_id: z172.string(),
  timestamps_ms: z172.array(z172.number()).optional(),
  current_levels: z172.array(z172.number()),
  source_component_id: z172.string().optional(),
  subcircuit_connectivity_map_key: z172.string().optional(),
  time_per_step: duration_ms,
  start_time_ms: ms,
  end_time_ms: ms,
  name: z172.string().optional(),
  color: z172.string().optional()
}).describe("Stores current measurements over time for a simulation");
expectTypesMatch(true);

// src/simulation/simulation_switch.ts
import { z as z173 } from "zod";
var simulation_switch = z173.object({
  type: z173.literal("simulation_switch"),
  simulation_switch_id: getZodPrefixedIdWithDefault("simulation_switch"),
  source_component_id: z173.string().optional(),
  closes_at: ms.optional(),
  opens_at: ms.optional(),
  starts_closed: z173.boolean().optional(),
  switching_frequency: frequency.optional()
}).describe("Defines a switch for simulation timing control");
expectTypesMatch(true);

// src/simulation/simulation_voltage_probe.ts
import { z as z174 } from "zod";
var simulation_voltage_probe = z174.object({
  type: z174.literal("simulation_voltage_probe"),
  simulation_voltage_probe_id: getZodPrefixedIdWithDefault(
    "simulation_voltage_probe"
  ),
  source_component_id: z174.string().optional(),
  name: z174.string().optional(),
  signal_input_source_port_id: z174.string().optional(),
  signal_input_source_net_id: z174.string().optional(),
  reference_input_source_port_id: z174.string().optional(),
  reference_input_source_net_id: z174.string().optional(),
  subcircuit_id: z174.string().optional(),
  color: z174.string().optional()
}).describe(
  "Defines a voltage probe for simulation. If a reference input is not provided, it measures against ground. If a reference input is provided, it measures the differential voltage between two points."
).superRefine((data, ctx) => {
  const is_differential = data.reference_input_source_port_id || data.reference_input_source_net_id;
  if (is_differential) {
    const has_ports = !!data.signal_input_source_port_id || !!data.reference_input_source_port_id;
    const has_nets = !!data.signal_input_source_net_id || !!data.reference_input_source_net_id;
    if (has_ports && has_nets) {
      ctx.addIssue({
        code: z174.ZodIssueCode.custom,
        message: "Cannot mix port and net connections in a differential probe."
      });
    } else if (has_ports) {
      if (!data.signal_input_source_port_id || !data.reference_input_source_port_id) {
        ctx.addIssue({
          code: z174.ZodIssueCode.custom,
          message: "Differential port probe requires both signal_input_source_port_id and reference_input_source_port_id."
        });
      }
    } else if (has_nets) {
      if (!data.signal_input_source_net_id || !data.reference_input_source_net_id) {
        ctx.addIssue({
          code: z174.ZodIssueCode.custom,
          message: "Differential net probe requires both signal_input_source_net_id and reference_input_source_net_id."
        });
      }
    }
  } else {
    if (!!data.signal_input_source_port_id === !!data.signal_input_source_net_id) {
      ctx.addIssue({
        code: z174.ZodIssueCode.custom,
        message: "A voltage probe must have exactly one of signal_input_source_port_id or signal_input_source_net_id."
      });
    }
  }
});
expectTypesMatch(true);

// src/simulation/simulation_current_probe.ts
import { z as z175 } from "zod";
var simulation_current_probe = z175.object({
  type: z175.literal("simulation_current_probe"),
  simulation_current_probe_id: getZodPrefixedIdWithDefault(
    "simulation_current_probe"
  ),
  source_component_id: z175.string().optional(),
  name: z175.string().optional(),
  positive_source_port_id: z175.string().optional(),
  negative_source_port_id: z175.string().optional(),
  positive_source_net_id: z175.string().optional(),
  negative_source_net_id: z175.string().optional(),
  subcircuit_id: z175.string().optional(),
  color: z175.string().optional()
}).describe(
  "Defines a current probe for simulation. It measures current flowing from the positive endpoint to the negative endpoint."
).superRefine((data, ctx) => {
  const hasPositivePort = !!data.positive_source_port_id;
  const hasNegativePort = !!data.negative_source_port_id;
  const hasPositiveNet = !!data.positive_source_net_id;
  const hasNegativeNet = !!data.negative_source_net_id;
  const hasPorts = hasPositivePort || hasNegativePort;
  const hasNets = hasPositiveNet || hasNegativeNet;
  if (hasPorts && hasNets) {
    ctx.addIssue({
      code: z175.ZodIssueCode.custom,
      message: "Cannot mix port and net connections in a current probe."
    });
    return;
  }
  if (hasPorts) {
    if (!hasPositivePort || !hasNegativePort) {
      ctx.addIssue({
        code: z175.ZodIssueCode.custom,
        message: "Current probe using source ports requires both positive_source_port_id and negative_source_port_id."
      });
    }
    return;
  }
  if (hasNets) {
    if (!hasPositiveNet || !hasNegativeNet) {
      ctx.addIssue({
        code: z175.ZodIssueCode.custom,
        message: "Current probe using source nets requires both positive_source_net_id and negative_source_net_id."
      });
    }
    return;
  }
  ctx.addIssue({
    code: z175.ZodIssueCode.custom,
    message: "A current probe must have either positive/negative source port ids or positive/negative source net ids."
  });
});
expectTypesMatch(true);

// src/simulation/simulation_unknown_experiment_error.ts
import { z as z176 } from "zod";
var simulation_unknown_experiment_error = base_circuit_json_error.extend({
  type: z176.literal("simulation_unknown_experiment_error"),
  simulation_unknown_experiment_error_id: getZodPrefixedIdWithDefault(
    "simulation_unknown_experiment_error"
  ),
  error_type: z176.literal("simulation_unknown_experiment_error").default("simulation_unknown_experiment_error"),
  simulation_experiment_id: z176.string().optional(),
  subcircuit_id: z176.string().optional()
}).describe("An unknown error occurred during the simulation experiment.");
expectTypesMatch(true);

// src/simulation/simulation_op_amp.ts
import { z as z177 } from "zod";
var simulation_op_amp = z177.object({
  type: z177.literal("simulation_op_amp"),
  simulation_op_amp_id: getZodPrefixedIdWithDefault("simulation_op_amp"),
  source_component_id: z177.string().optional(),
  inverting_input_source_port_id: z177.string(),
  non_inverting_input_source_port_id: z177.string(),
  output_source_port_id: z177.string(),
  positive_supply_source_port_id: z177.string(),
  negative_supply_source_port_id: z177.string()
}).describe("Defines a simple ideal operational amplifier for simulation");
expectTypesMatch(true);

// src/simulation/simulation_spice_subcircuit.ts
import { z as z178 } from "zod";
var simulation_spice_subcircuit = z178.object({
  type: z178.literal("simulation_spice_subcircuit"),
  simulation_spice_subcircuit_id: getZodPrefixedIdWithDefault(
    "simulation_spice_subcircuit"
  ),
  source_component_id: z178.string(),
  spice_pin_to_source_port_map: z178.record(z178.string(), z178.string()),
  subcircuit_source: z178.string()
}).describe("Defines a custom SPICE subcircuit model for simulation");
expectTypesMatch(
  true
);

// src/simulation/simulation_oscilloscope_trace.ts
import { z as z179 } from "zod";
var hasValue = (value) => value !== void 0;
var simulation_oscilloscope_trace = z179.object({
  type: z179.literal("simulation_oscilloscope_trace"),
  simulation_oscilloscope_trace_id: getZodPrefixedIdWithDefault(
    "simulation_oscilloscope_trace"
  ),
  simulation_transient_voltage_graph_id: z179.string().optional(),
  simulation_transient_current_graph_id: z179.string().optional(),
  simulation_voltage_probe_id: z179.string().optional(),
  simulation_current_probe_id: z179.string().optional(),
  display_name: z179.string().optional(),
  color: z179.string().optional(),
  display_center_value: z179.number().optional(),
  display_center_offset_divs: z179.number().optional(),
  volts_per_div: z179.number().positive().optional(),
  amps_per_div: z179.number().positive().optional()
}).describe(
  "Defines how a simulation measurement is rendered as an oscilloscope-style trace."
).superRefine((data, ctx) => {
  const voltageReferences = [
    data.simulation_transient_voltage_graph_id,
    data.simulation_voltage_probe_id
  ].filter(hasValue).length;
  const currentReferences = [
    data.simulation_transient_current_graph_id,
    data.simulation_current_probe_id
  ].filter(hasValue).length;
  if (voltageReferences + currentReferences !== 1) {
    ctx.addIssue({
      code: z179.ZodIssueCode.custom,
      message: "An oscilloscope trace must reference exactly one voltage graph, current graph, voltage probe, or current probe."
    });
  }
  if (voltageReferences > 0 && data.amps_per_div !== void 0) {
    ctx.addIssue({
      code: z179.ZodIssueCode.custom,
      message: "Voltage oscilloscope traces must use volts_per_div, not amps_per_div."
    });
  }
  if (currentReferences > 0 && data.volts_per_div !== void 0) {
    ctx.addIssue({
      code: z179.ZodIssueCode.custom,
      message: "Current oscilloscope traces must use amps_per_div, not volts_per_div."
    });
  }
});
expectTypesMatch(true);

// src/any_circuit_element.ts
import { z as z180 } from "zod";
var any_circuit_element = z180.union([
  source_trace,
  source_port,
  source_component_internal_connection,
  any_source_component,
  source_net,
  source_group,
  source_simple_chip,
  source_simple_capacitor,
  source_simple_diode,
  source_simple_led,
  source_simple_resistor,
  source_simple_power_source,
  source_simple_battery,
  source_simple_inductor,
  source_simple_pin_header,
  source_simple_pinout,
  source_simple_resonator,
  source_simple_switch,
  source_simple_transistor,
  source_simple_test_point,
  source_simple_mosfet,
  source_simple_op_amp,
  source_simple_potentiometer,
  source_simple_push_button,
  source_pcb_ground_plane,
  source_manually_placed_via,
  source_board,
  source_project_metadata,
  source_invalid_component_property_error,
  source_trace_not_connected_error,
  source_pin_missing_trace_warning,
  source_unnamed_trace_warning,
  source_missing_manufacturer_part_number_warning,
  source_refdes_convention_warning,
  source_no_power_pin_defined_warning,
  source_no_ground_pin_defined_warning,
  source_component_pins_underspecified_warning,
  source_pin_must_be_connected_error,
  unknown_error_finding_part,
  source_part_not_found_warning,
  source_i2c_misconfigured_error,
  source_component_misconfigured_error,
  source_ambiguous_port_reference,
  pcb_component,
  pcb_hole,
  pcb_missing_footprint_error,
  external_footprint_load_error,
  circuit_json_footprint_load_error,
  pcb_manual_edit_conflict_warning,
  pcb_connector_not_in_accessible_orientation_warning,
  supplier_footprint_mismatch_warning,
  pcb_plated_hole,
  pcb_keepout,
  pcb_port,
  pcb_net,
  pcb_text,
  pcb_trace,
  pcb_trace_warning,
  pcb_trace_too_long_warning,
  pcb_via,
  pcb_smtpad,
  pcb_solder_paste,
  pcb_board,
  pcb_panel,
  pcb_group,
  pcb_trace_hint,
  pcb_silkscreen_line,
  pcb_silkscreen_path,
  pcb_silkscreen_text,
  pcb_silkscreen_pill,
  pcb_copper_text,
  pcb_silkscreen_rect,
  pcb_silkscreen_circle,
  pcb_silkscreen_oval,
  pcb_silkscreen_graphic,
  pcb_trace_error,
  pcb_trace_missing_error,
  pcb_placement_error,
  pcb_panelization_placement_error,
  pcb_port_not_matched_error,
  pcb_port_not_connected_error,
  pcb_via_clearance_error,
  pcb_via_trace_clearance_error,
  pcb_pad_pad_clearance_error,
  pcb_pad_trace_clearance_error,
  pcb_fabrication_note_path,
  pcb_fabrication_note_text,
  pcb_fabrication_note_rect,
  pcb_fabrication_note_dimension,
  pcb_note_text,
  pcb_note_rect,
  pcb_note_path,
  pcb_note_line,
  pcb_note_dimension,
  pcb_autorouting_error,
  pcb_footprint_overlap_error,
  pcb_courtyard_overlap_error,
  pcb_breakout_point,
  pcb_cutout,
  pcb_ground_plane,
  pcb_ground_plane_region,
  pcb_thermal_spoke,
  pcb_copper_pour,
  pcb_component_outside_board_error,
  pcb_component_not_on_board_edge_error,
  pcb_component_invalid_layer_error,
  pcb_courtyard_rect,
  pcb_courtyard_outline,
  pcb_courtyard_polygon,
  pcb_courtyard_circle,
  pcb_courtyard_pill,
  schematic_box,
  schematic_text,
  schematic_line,
  schematic_rect,
  schematic_circle,
  schematic_arc,
  schematic_component,
  schematic_symbol,
  schematic_port,
  schematic_trace,
  schematic_path,
  schematic_error,
  schematic_layout_error,
  schematic_net_label,
  schematic_debug_object,
  schematic_voltage_probe,
  schematic_manual_edit_conflict_warning,
  schematic_component_overlap_warning,
  schematic_group,
  schematic_sheet,
  schematic_table,
  schematic_table_cell,
  cad_component,
  simulation_voltage_source,
  simulation_current_source,
  simulation_experiment,
  simulation_transient_voltage_graph,
  simulation_transient_current_graph,
  simulation_switch,
  simulation_voltage_probe,
  simulation_current_probe,
  simulation_oscilloscope_trace,
  simulation_unknown_experiment_error,
  simulation_op_amp,
  simulation_spice_subcircuit
]);
var any_soup_element = any_circuit_element;
expectTypesMatch(true);
expectStringUnionsMatch(true);
export {
  all_layers,
  any_circuit_element,
  any_soup_element,
  any_source_component,
  asset,
  base_circuit_json_error,
  battery_capacity,
  brep_shape,
  cadModelDefaultDirectionMap,
  cad_component,
  cad_model_axis_directions,
  cad_model_formats,
  capacitance,
  circuit_json_footprint_load_error,
  current,
  distance,
  duration_ms,
  experiment_type,
  external_footprint_load_error,
  frequency,
  getZodPrefixedIdWithDefault,
  inductance,
  kicadAt,
  kicadEffects,
  kicadFont,
  kicadFootprintAttributes,
  kicadFootprintMetadata,
  kicadFootprintModel,
  kicadFootprintPad,
  kicadFootprintProperties,
  kicadProperty,
  kicadSymbolEffects,
  kicadSymbolMetadata,
  kicadSymbolPinNames,
  kicadSymbolPinNumbers,
  kicadSymbolProperties,
  kicadSymbolProperty,
  layer_ref,
  layer_string,
  length,
  manufacturing_drc_properties,
  ms,
  ninePointAnchor,
  parseAndConvertSiUnit2 as parseAndConvertSiUnit,
  pcbRenderLayer,
  pcb_autorouting_error,
  pcb_board,
  pcb_breakout_point,
  pcb_component,
  pcb_component_invalid_layer_error,
  pcb_component_not_on_board_edge_error,
  pcb_component_outside_board_error,
  pcb_connector_not_in_accessible_orientation_warning,
  pcb_copper_pour,
  pcb_copper_pour_brep,
  pcb_copper_pour_polygon,
  pcb_copper_pour_rect,
  pcb_copper_text,
  pcb_courtyard_circle,
  pcb_courtyard_outline,
  pcb_courtyard_overlap_error,
  pcb_courtyard_pill,
  pcb_courtyard_polygon,
  pcb_courtyard_rect,
  pcb_cutout,
  pcb_cutout_circle,
  pcb_cutout_path,
  pcb_cutout_polygon,
  pcb_cutout_rect,
  pcb_fabrication_note_dimension,
  pcb_fabrication_note_path,
  pcb_fabrication_note_rect,
  pcb_fabrication_note_text,
  pcb_footprint_overlap_error,
  pcb_ground_plane,
  pcb_ground_plane_region,
  pcb_group,
  pcb_hole,
  pcb_hole_circle_or_square_shape,
  pcb_hole_circle_shape,
  pcb_hole_oval_shape,
  pcb_hole_pill_shape,
  pcb_hole_rect_shape,
  pcb_hole_rotated_pill_shape,
  pcb_keepout,
  pcb_manual_edit_conflict_warning,
  pcb_missing_footprint_error,
  pcb_net,
  pcb_note_dimension,
  pcb_note_line,
  pcb_note_path,
  pcb_note_rect,
  pcb_note_text,
  pcb_pad_pad_clearance_error,
  pcb_pad_trace_clearance_error,
  pcb_panel,
  pcb_panelization_placement_error,
  pcb_placement_error,
  pcb_plated_hole,
  pcb_port,
  pcb_port_not_connected_error,
  pcb_port_not_matched_error,
  pcb_route_hint,
  pcb_route_hints,
  pcb_silkscreen_circle,
  pcb_silkscreen_graphic,
  pcb_silkscreen_graphic_brep,
  pcb_silkscreen_line,
  pcb_silkscreen_oval,
  pcb_silkscreen_path,
  pcb_silkscreen_pill,
  pcb_silkscreen_rect,
  pcb_silkscreen_text,
  pcb_smtpad,
  pcb_smtpad_pill,
  pcb_solder_paste,
  pcb_text,
  pcb_thermal_spoke,
  pcb_trace,
  pcb_trace_error,
  pcb_trace_hint,
  pcb_trace_missing_error,
  pcb_trace_route_point,
  pcb_trace_route_point_through_pad,
  pcb_trace_route_point_via,
  pcb_trace_route_point_wire,
  pcb_trace_too_long_warning,
  pcb_trace_warning,
  pcb_via,
  pcb_via_clearance_error,
  pcb_via_trace_clearance_error,
  point,
  point3,
  point_with_bulge,
  port_arrangement,
  position,
  position3,
  resistance,
  ring,
  rotation,
  route_hint_point,
  schematic_arc,
  schematic_box,
  schematic_circle,
  schematic_component,
  schematic_component_overlap_warning,
  schematic_component_port_arrangement_by_sides,
  schematic_component_port_arrangement_by_size,
  schematic_debug_line,
  schematic_debug_object,
  schematic_debug_object_base,
  schematic_debug_point,
  schematic_debug_rect,
  schematic_error,
  schematic_group,
  schematic_layout_error,
  schematic_line,
  schematic_manual_edit_conflict_warning,
  schematic_net_label,
  schematic_path,
  schematic_pin_styles,
  schematic_port,
  schematic_rect,
  schematic_sheet,
  schematic_symbol,
  schematic_table,
  schematic_table_cell,
  schematic_text,
  schematic_trace,
  schematic_voltage_probe,
  simulation_ac_current_source,
  simulation_ac_voltage_source,
  simulation_current_probe,
  simulation_current_source,
  simulation_dc_current_source,
  simulation_dc_voltage_source,
  simulation_experiment,
  simulation_op_amp,
  simulation_oscilloscope_trace,
  simulation_spice_subcircuit,
  simulation_switch,
  simulation_transient_current_graph,
  simulation_transient_voltage_graph,
  simulation_unknown_experiment_error,
  simulation_voltage_probe,
  simulation_voltage_source,
  size,
  source_ambiguous_port_reference,
  source_board,
  source_component_base,
  source_component_internal_connection,
  source_component_misconfigured_error,
  source_component_pins_underspecified_warning,
  source_failed_to_create_component_error,
  source_group,
  source_i2c_misconfigured_error,
  source_interconnect,
  source_invalid_component_property_error,
  source_manually_placed_via,
  source_missing_manufacturer_part_number_warning,
  source_missing_property_error,
  source_net,
  source_no_ground_pin_defined_warning,
  source_no_power_pin_defined_warning,
  source_part_not_found_warning,
  source_pcb_ground_plane,
  source_pin_attributes,
  source_pin_missing_trace_warning,
  source_pin_must_be_connected_error,
  source_port,
  source_project_metadata,
  source_property_ignored_warning,
  source_refdes_convention_warning,
  source_simple_ammeter,
  source_simple_battery,
  source_simple_capacitor,
  source_simple_chip,
  source_simple_connector,
  source_simple_crystal,
  source_simple_current_source,
  source_simple_diode,
  source_simple_fiducial,
  source_simple_fuse,
  source_simple_ground,
  source_simple_inductor,
  source_simple_led,
  source_simple_mosfet,
  source_simple_op_amp,
  source_simple_pin_header,
  source_simple_pinout,
  source_simple_potentiometer,
  source_simple_power_source,
  source_simple_push_button,
  source_simple_resistor,
  source_simple_resonator,
  source_simple_switch,
  source_simple_test_point,
  source_simple_transistor,
  source_simple_voltage_probe,
  source_simple_voltage_source,
  source_trace,
  source_trace_not_connected_error,
  source_unnamed_trace_warning,
  spice_simulation_options,
  supplier_footprint_mismatch_warning,
  supplier_name,
  time,
  timestamp,
  unknown_error_finding_part,
  visible_layer,
  voltage,
  wave_shape
};
//# sourceMappingURL=index.mjs.map