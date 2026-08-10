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

export { useToast, toast, dismissToast, clearToasts } from "./hooks/use-toast";
export type {
  ToastVariant,
  ToastActionOptions,
  ToastOptions,
  ToastState,
  UseToastResult,
} from "./hooks/use-toast";

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

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverClose,
  PopoverPortal,
  PopoverContent,
  popoverContentVariants,
  popoverArrowVariants,
} from "./components/popover";
export type {
  PopoverClassNames,
  PopoverContentProps,
  PopoverContentVariantsProps,
} from "./components/popover";

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  tooltipContentVariants,
  tooltipArrowVariants,
} from "./components/tooltip";
export type {
  TooltipClassNames,
  TooltipContentProps,
  TooltipContentVariantsProps,
} from "./components/tooltip";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSub,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  dropdownMenuContentVariants,
  dropdownMenuItemVariants,
  dropdownMenuLabelVariants,
  dropdownMenuSeparatorVariants,
  dropdownMenuShortcutVariants,
} from "./components/dropdown-menu";
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuContentVariantsProps,
  DropdownMenuItemVariantsProps,
} from "./components/dropdown-menu";

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerTitle,
  DrawerDescription,
  drawerOverlayVariants,
  drawerContentVariants,
} from "./components/drawer";
export type {
  DrawerClassNames,
  DrawerOverlayProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerFooterProps,
  DrawerContentVariantsProps,
} from "./components/drawer";

export {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  Toaster,
  toastViewportVariants,
  toastVariants,
  toastIconVariants,
} from "./components/toast";
export type {
  ToastClassNames,
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToasterProps,
  ToastVariantsProps,
} from "./components/toast";

export { AlertBanner, alertBannerVariants, alertBannerIconVariants } from "./components/alert-banner";
export type {
  AlertBannerClassNames,
  AlertBannerProps,
  AlertBannerVariantsProps,
} from "./components/alert-banner";

export { Spinner, spinnerVariants } from "./components/spinner";
export type { SpinnerProps, SpinnerVariantsProps } from "./components/spinner";

export { Skeleton, SkeletonText, skeletonVariants } from "./components/skeleton";
export type { SkeletonProps, SkeletonTextProps, SkeletonVariantsProps } from "./components/skeleton";

export { EmptyState, emptyStateVariants, emptyStateIconVariants } from "./components/empty-state";
export type {
  EmptyStateClassNames,
  EmptyStateProps,
  EmptyStateVariantsProps,
} from "./components/empty-state";

export { ErrorState, errorStateVariants, errorStateIconVariants } from "./components/error-state";
export type {
  ErrorStateClassNames,
  ErrorStateProps,
  ErrorStateVariantsProps,
} from "./components/error-state";

export {
  ProgressBar,
  progressBarTrackVariants,
  progressBarFillVariants,
} from "./components/progress-bar";
export type {
  ProgressBarClassNames,
  ProgressBarProps,
  ProgressBarTrackVariantsProps,
  ProgressBarFillVariantsProps,
} from "./components/progress-bar";

export { Backdrop, backdropVariants } from "./components/backdrop";
export type { BackdropProps, BackdropVariantsProps } from "./components/backdrop";

export { Container, containerVariants } from "./components/container";
export type { ContainerProps, ContainerVariantsProps } from "./components/container";

export {
  Grid,
  gridVariants,
  gridColsClassNames,
  gridColsSmClassNames,
  gridColsMdClassNames,
  gridColsLgClassNames,
  gridColsXlClassNames,
} from "./components/grid";
export type { GridProps, GridVariantsProps, GridCols } from "./components/grid";

export { Stack, stackVariants } from "./components/stack";
export type { StackProps, StackVariantsProps } from "./components/stack";

export { Divider, dividerVariants } from "./components/divider";
export type { DividerProps, DividerVariantsProps } from "./components/divider";

export { AspectRatio, aspectRatioVariants } from "./components/aspect-ratio";
export type { AspectRatioProps, AspectRatioVariantsProps } from "./components/aspect-ratio";

export {
  ScrollArea,
  scrollAreaVariants,
  scrollAreaViewportVariants,
  scrollAreaScrollbarVariants,
  scrollAreaThumbVariants,
} from "./components/scroll-area";
export type {
  ScrollAreaProps,
  ScrollAreaClassNames,
  ScrollAreaVariantsProps,
} from "./components/scroll-area";

export { VisuallyHidden, visuallyHiddenVariants } from "./components/visually-hidden";
export type {
  VisuallyHiddenProps,
  VisuallyHiddenVariantsProps,
} from "./components/visually-hidden";

export { SkipLink, skipLinkVariants } from "./components/skip-link";
export type { SkipLinkProps, SkipLinkVariantsProps } from "./components/skip-link";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "./components/tabs";
export type {
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  TabsListVariantsProps,
  TabsTriggerVariantsProps,
  TabsContentVariantsProps,
} from "./components/tabs";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
} from "./components/accordion";
export type {
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionItemVariantsProps,
  AccordionTriggerVariantsProps,
  AccordionContentVariantsProps,
} from "./components/accordion";

export {
  Stepper,
  stepperVariants,
  stepperItemVariants,
  stepperConnectorVariants,
  stepperIndicatorVariants,
  stepperLabelVariants,
} from "./components/stepper";
export type {
  StepperProps,
  StepperStep,
  StepperClassNames,
  StepperLinkProps,
  StepperSlots,
  StepperVariantsProps,
  StepperItemVariantsProps,
  StepperState,
} from "./components/stepper";

export {
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuLink,
  navMenuVariants,
  navMenuListVariants,
  navMenuTriggerVariants,
  navMenuLinkVariants,
  navMenuContentVariants,
  navMenuViewportVariants,
} from "./components/nav-menu";
export type {
  NavMenuProps,
  NavMenuListProps,
  NavMenuTriggerProps,
  NavMenuContentProps,
  NavMenuLinkProps,
  NavMenuVariantsProps,
} from "./components/nav-menu";

export {
  MegaMenu,
  megaMenuVariants,
  megaMenuListVariants,
  megaMenuTriggerVariants,
  megaMenuLinkVariants,
  megaMenuContentVariants,
  megaMenuViewportVariants,
  megaMenuSectionHeadingVariants,
  megaMenuFeaturedVariants,
} from "./components/mega-menu";
export type {
  MegaMenuProps,
  MegaMenuItem,
  MegaMenuSection,
  MegaMenuLinkItem,
  MegaMenuFeatured,
  MegaMenuClassNames,
  MegaMenuLinkProps,
  MegaMenuSlots,
  MegaMenuVariantsProps,
} from "./components/mega-menu";

export {
  MobileNav,
  mobileNavTriggerVariants,
  mobileNavBackVariants,
  mobileNavItemVariants,
} from "./components/mobile-nav";
export type {
  MobileNavProps,
  MobileNavItem,
  MobileNavClassNames,
  MobileNavLinkProps,
  MobileNavSlots,
  MobileNavVariantsProps,
} from "./components/mobile-nav";

export { HeaderShell, headerShellVariants, headerShellUtilityBarVariants } from "./components/header-shell";
export type {
  HeaderShellProps,
  HeaderShellClassNames,
  HeaderShellVariantsProps,
} from "./components/header-shell";

export {
  FooterShell,
  footerShellVariants,
  footerShellColumnHeadingVariants,
  footerShellBottomBarVariants,
} from "./components/footer-shell";
export type {
  FooterShellProps,
  FooterShellColumn,
  FooterShellClassNames,
  FooterShellVariantsProps,
} from "./components/footer-shell";

export {
  LanguageCurrencySelector,
  languageCurrencySelectorTriggerVariants,
  languageCurrencySelectorContentVariants,
} from "./components/language-currency-selector";
export type {
  LanguageCurrencySelectorProps,
  LanguageCurrencySelectorClassNames,
  LanguageCurrencySelectorVariantsProps,
} from "./components/language-currency-selector";

export {
  StoreSelector,
  storeSelectorTriggerVariants,
  storeSelectorContentVariants,
} from "./components/store-selector";
export type {
  StoreSelectorProps,
  StoreSelectorStore,
  StoreSelectorClassNames,
  StoreSelectorVariantsProps,
} from "./components/store-selector";
