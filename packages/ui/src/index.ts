// Barrel — re-exports every component, its variants, and shared lib helpers.
// Each new component adds one line here (see CLAUDE.md).

export { cn } from "./lib/cn";
export { Slot, Slottable } from "./lib/slot";

export { configureStorefrontUI } from "./config";
export type { ConfigureStorefrontUIOptions } from "./config";

export { configureMessages, resetMessages, getMessages, defaultMessages } from "./i18n/messages";
export type { StorefrontMessages } from "./i18n/messages";

export type { ProductSummary } from "./types/product";

export { useQuantity } from "./hooks/use-quantity";
export type { UseQuantityOptions, UseQuantityResult } from "./hooks/use-quantity";

export { useRangeSlider } from "./hooks/use-range-slider";
export type { UseRangeSliderOptions, UseRangeSliderResult } from "./hooks/use-range-slider";

export { Button, buttonVariants } from "./components/button";
export type { ButtonProps, ButtonVariantsProps } from "./components/button";

export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps, BadgeVariantsProps } from "./components/badge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
} from "./components/card";
export type {
  CardProps,
  CardSlotProps,
  CardTitleProps,
  CardDescriptionProps,
  CardVariantsProps,
} from "./components/card";

export { Input, inputVariants } from "./components/input";
export type { InputProps, InputVariantsProps } from "./components/input";

export { FormField, formFieldVariants } from "./components/form-field";
export type {
  FormFieldProps,
  FormFieldClassNames,
  FormFieldVariantsProps,
} from "./components/form-field";

export { Price, priceVariants } from "./components/price";
export type { PriceProps, PriceVariantsProps } from "./components/price";

export { QuantityStepper, quantityStepperVariants } from "./components/quantity-stepper";
export type {
  QuantityStepperProps,
  QuantityStepperClassNames,
  QuantityStepperVariantsProps,
} from "./components/quantity-stepper";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogOverlayVariants,
  dialogContentVariants,
} from "./components/dialog";
export type {
  DialogClassNames,
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogContentVariantsProps,
} from "./components/dialog";

export { ProductCard, productCardVariants } from "./components/product-card";
export type {
  ProductCardProps,
  ProductCardClassNames,
  ProductCardSlots,
  ProductCardImageProps,
  ProductCardVariantsProps,
} from "./components/product-card";

export { Checkbox, checkboxVariants, checkboxBoxVariants } from "./components/checkbox";
export type {
  CheckboxProps,
  CheckboxClassNames,
  CheckboxVariantsProps,
} from "./components/checkbox";

export { Select, selectVariants, selectContentVariants, selectItemVariants } from "./components/select";
export type {
  SelectProps,
  SelectClassNames,
  SelectOption,
  SelectOptionGroup,
  SelectVariantsProps,
} from "./components/select";

export { RadioGroup, Radio, radioGroupVariants, radioVariants, radioBoxVariants, radioIndicatorVariants } from "./components/radio-group";
export type {
  RadioGroupProps,
  RadioGroupClassNames,
  RadioProps,
  RadioClassNames,
  RadioGroupVariantsProps,
  RadioVariantsProps,
} from "./components/radio-group";

export { Switch, switchVariants, switchTrackVariants, switchThumbVariants } from "./components/switch";
export type { SwitchProps, SwitchClassNames, SwitchVariantsProps } from "./components/switch";

export { Label, labelVariants } from "./components/label";
export type { LabelProps, LabelVariantsProps } from "./components/label";

export { Textarea, textareaVariants } from "./components/textarea";
export type { TextareaProps, TextareaVariantsProps } from "./components/textarea";

export { Fieldset, fieldsetVariants, legendVariants } from "./components/fieldset";
export type { FieldsetProps, FieldsetClassNames, FieldsetVariantsProps } from "./components/fieldset";

export {
  Combobox,
  comboboxInputVariants,
  comboboxContentVariants,
  comboboxOptionVariants,
} from "./components/combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxClassNames,
  ComboboxVariantsProps,
} from "./components/combobox";

export {
  FileUpload,
  fileUploadVariants,
  dropzoneVariants,
  fileListVariants,
  fileRowVariants,
  fileRowProgressVariants,
  fileRowProgressBarVariants,
} from "./components/file-upload";
export type {
  FileUploadProps,
  FileUploadItem,
  FileUploadClassNames,
  FileUploadVariantsProps,
  DropzoneVariantsProps,
} from "./components/file-upload";

export {
  DatePicker,
  datePickerTriggerVariants,
  datePickerContentVariants,
  datePickerNavButtonVariants,
  datePickerDayVariants,
} from "./components/date-picker";
export type {
  DatePickerProps,
  DatePickerClassNames,
  DatePickerVariantsProps,
} from "./components/date-picker";

export { Rating, ratingVariants } from "./components/rating";
export type { RatingProps, RatingClassNames, RatingVariantsProps } from "./components/rating";

export {
  RangeSlider,
  rangeSliderVariants,
  rangeSliderTrackVariants,
  rangeSliderRangeVariants,
  rangeSliderThumbVariants,
} from "./components/range-slider";
export type {
  RangeSliderProps,
  RangeSliderClassNames,
  RangeSliderVariantsProps,
} from "./components/range-slider";

export { Breadcrumb, breadcrumbVariants } from "./components/breadcrumb";
export type {
  BreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbClassNames,
  BreadcrumbLinkProps,
  BreadcrumbSlots,
  BreadcrumbVariantsProps,
} from "./components/breadcrumb";

export { Pagination, getPaginationItems, paginationVariants } from "./components/pagination";
export type {
  PaginationProps,
  PaginationClassNames,
  PaginationItemValue,
  PaginationLinkProps,
  PaginationSlots,
  PaginationVariantsProps,
} from "./components/pagination";

export { Icon, configureIcons, resetIcons, iconVariants, defaultIcons } from "./components/icon";
export type { IconProps, IconGlyph, IconGlyphProps, IconName, IconVariantsProps } from "./components/icon";

export { Image, configureImageComponent, resetImageComponent, imageVariants } from "./components/image";
export type {
  ImageProps,
  StorefrontImageProps,
  ImageComponent,
  ImageVariantsProps,
} from "./components/image";
