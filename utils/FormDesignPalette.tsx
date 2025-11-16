// // src/components/ui/FormDesignPalette.tsx
// import React from "react";
// // ===== COMMENTED OUT CHAKRA UI IMPORTS =====
// // import {
// //   FormControl,
// //   FormLabel,
// //   Input,
// //   Checkbox,
// //   Select,
// //   Text,
// //   Button,
// //   VStack,
// //   Box,
// //   Textarea,
// // } from "@chakra-ui/react";

// // ===== COMMENTED OUT ANT DESIGN IMPORTS (CAUSING RC-UTIL ERROR) =====
// // import {
// //   Form,
// //   Input,
// //   Checkbox,
// //   Select,
// //   Button,
// //   Card,
// //   Typography,
// //   Space,
// //   message,
// // } from "antd";

// // ===== PURE REACT + CSS SOLUTION (NO EXTERNAL UI LIBRARY) =====
// import { withTheme } from "@rjsf/core";

// /* ---------------------------------------------
//    CSS Styles for Beautiful Form Components
// ---------------------------------------------- */
// const baseFontFamily = 'Vazirmatn, B Nazanin, Tahoma, Arial, sans-serif';

// const styles = {
//   formField: {
//     marginBottom: '16px', // Reduced gap for checkbox lists
//     width: '100%',
//     textAlign: 'right' as const, // Right-align all fields
//     display: 'block',
//     direction: 'rtl' as const,
//   },
//   fieldRow: {
//     display: 'flex',
//     flexDirection: 'row-reverse' as const,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     gap: '12px',
//     width: '100%',
//   },
//   labelWrapper: {
//     minWidth: '160px',
//     display: 'flex',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     textAlign: 'right' as const,
//   },
//   label: {
//     display: 'block',
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#262626',
//     fontFamily: baseFontFamily,
//     textAlign: 'right' as const, // Right-align labels
//   },
//   required: {
//     color: '#ff4d4f',
//   },
//   inputContainer: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'flex-start',
//     width: '100%',
//     marginRight: '12px',
//   },
//   input: {
//     width: '100%',
//     padding: '16px 20px', // Increased padding for better touch targets
//     fontSize: '16px',
//     fontFamily: baseFontFamily,
//     border: '.5px solid #d9d9d9',
//     borderRadius: '4px', // More rounded for modern look
//     transition: 'all 0.3s ease',
//     boxSizing: 'border-box',
//     minHeight: '48px', // Minimum touch target size for mobile
//     textAlign: 'right' as const, // Right-align input text
//     direction: 'rtl' as const, // RTL direction for right-to-left text
//   },
//   inputFocus: {
//     borderColor: '#1890ff',
//     boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
//     outline: 'none',
//   },
//   textarea: {
//     width: '100%',
//     padding: '16px 20px', // Increased padding for better touch targets
//     fontSize: '16px',
//     fontFamily: baseFontFamily,
//     border: '.5px solid #d9d9d9',
//     borderRadius: '12px', // More rounded for modern look
//     transition: 'all 0.3s ease',
//     resize: 'vertical',
//     minHeight: '120px', // Increased minimum height
//     boxSizing: 'border-box',
//     textAlign: 'right' as const, // Right-align textarea text
//     direction: 'rtl' as const, // RTL direction for right-to-left text
//   },
//   select: {
//     width: '100%',
//     padding: '16px 20px', // Increased padding for better touch targets
//     fontSize: '16px',
//     fontFamily: baseFontFamily,
//     border: '.5px solid #d9d9d9',
//     borderRadius: '12px', // More rounded for modern look
//     backgroundColor: 'white',
//     cursor: 'pointer',
//     boxSizing: 'border-box',
//     minHeight: '48px', // Minimum touch target size for mobile
//     textAlign: 'right' as const, // Right-align select text
//     direction: 'rtl' as const, // RTL direction for right-to-left text
//   },
//   checkbox: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     flexDirection: 'row-reverse' as const,
//     cursor: 'pointer',
//     marginBottom: '12px',
//     width: '100%',
//     flexWrap: 'nowrap' as const,
//   },
//   checkboxInput: {
//     width: '18px',
//     height: '18px',
//     cursor: 'pointer',
//     margin: 0,
//     flexShrink: 0,
//   },
//   checkboxLabel: {
//     fontSize: '16px',
//     fontFamily: baseFontFamily,
//     color: '#262626',
//     cursor: 'pointer',
//     margin: 0,
//     userSelect: 'none' as const,
//     whiteSpace: 'nowrap' as const,
//     flexShrink: 0,
//   },
//   button: {
//     backgroundColor: '#1890ff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     padding: '12px 24px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     width: '100%',
//     fontFamily: baseFontFamily,
//   },
//   buttonHover: {
//     backgroundColor: '#40a9ff',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     padding: '4px', // Reduced padding for mobile
//     maxWidth: '100%',
//     margin: '0',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   error: {
//     color: '#ff4d4f',
//     fontSize: '14px',
//     marginTop: '4px',
//     fontFamily: baseFontFamily,
//   },
//   help: {
//     color: '#8c8c8c',
//     fontSize: '14px',
//     marginTop: '4px',
//     fontFamily: baseFontFamily,
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#1890ff',
//     textAlign: 'right' as const,
//     marginBottom: '16px',
//     fontFamily: baseFontFamily,
//   },
//   description: {
//     fontSize: '16px',
//     color: '#8c8c8c',
//     textAlign: 'right' as const,
//     marginBottom: '24px',
//     fontFamily: baseFontFamily,
//   },
//   fileInput: {
//     width: '100%',
//     padding: '8px',
//     fontSize: '16px',
//     border: '.5px solid #d9d9d9',
//     borderRadius: '8px',
//     backgroundColor: 'white',
//     cursor: 'pointer',
//     boxSizing: 'border-box',
//   },
//   fileButton: {
//     backgroundColor: '#f5f5f5',
//     color: '#262626',
//     border: '.5px solid #d9d9d9',
//     borderRadius: '8px',
//     padding: '8px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     width: '100%',
//     marginTop: '8px',
//   },
// };

// /* ---------------------------------------------
//    Helper function: Detect Persian text for RTL
// ---------------------------------------------- */
// function isPersian(text?: string): boolean {
//   if (!text) return false;
//   return /[\u0600-\u06FF]/.test(text);
// }

// /* ---------------------------------------------
//    Main wrapper for each field (Title above input)
//    Note: When label is undefined, this component doesn't render a label
//    (FieldTemplate handles label rendering to avoid duplication)
// ---------------------------------------------- */
// const FormField = ({
//   label,
//   children,
//   required = false,
//   help,
//   error,
// }: {
//   label?: string;
//   children: React.ReactNode;
//   required?: boolean;
//   help?: string;
//   error?: string;
// }) => {
//   // If label is undefined, don't render the label wrapper
//   // FieldTemplate will handle label rendering
//   if (label === undefined) {
//     return (
//       <div style={styles.formField}>
//         <div style={styles.inputContainer}>{children}</div>
//         {help && <div style={styles.help}>{help}</div>}
//         {error && <div style={styles.error}>{error}</div>}
//       </div>
//     );
//   }

//   // If label is provided (for backward compatibility or special cases)
//   return (
//     <div style={styles.formField}>
//       <div style={styles.fieldRow}>
//         {label && (
//           <div style={styles.labelWrapper}>
//             <span style={styles.label}>
//               {label}
//               {required && <span style={styles.required}> *</span>}
//             </span>
//           </div>
//         )}
//         <div style={styles.inputContainer}>{children}</div>
//       </div>
//       {help && <div style={styles.help}>{help}</div>}
//       {error && <div style={styles.error}>{error}</div>}
//     </div>
//   );
// };

// /* ---------------------------------------------
//    REQUIRED WIDGETS: Textbox, Textarea, Checkbox, Multi Choice, DateTime, Upload File
// ---------------------------------------------- */

// // ===== 1. TEXTBOX WIDGET =====
// const TextboxField = ({ 
//   label, 
//   value, 
//   onChange, 
//   placeholder,
//   required = false,
//   help,
//   error,
//   type = "text",
//   ...props 
// }: any) => (
//   <FormField label={label} required={required} help={help} error={error}>
//     <input
//       style={styles.input}
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       type={type}
//       {...props}
//     />
//   </FormField>
// );

// // ===== 2. TEXTAREA WIDGET =====
// const TextareaField = ({ 
//   label, 
//   value, 
//   onChange, 
//   placeholder,
//   required = false,
//   help,
//   error,
//   rows = 4,
//   ...props 
// }: any) => (
//   <FormField label={label} required={required} help={help} error={error}>
//     <textarea
//       style={styles.textarea}
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       rows={rows}
//       {...props}
//     />
//   </FormField>
// );

// // ===== 3. CHECKBOX WIDGET =====
// const CheckboxField = ({ 
//   label, 
//   value, 
//   onChange, 
//   required = false,
//   help,
//   error,
//   ...props 
// }: any) => {
//   // Ensure label is displayed - use empty string if label is undefined/null
//   const displayLabel = label || '';
  
//   return (
//     <div style={{ ...styles.formField, marginBottom: '12px', textAlign: 'right' as const }}>
//       <label style={styles.checkbox}>
//         <input
//           type="checkbox"
//           style={styles.checkboxInput}
//           checked={!!value}
//           onChange={(e) => onChange(e.target.checked)}
//           {...props}
//         />
//         {displayLabel && <span style={styles.checkboxLabel}>{displayLabel}</span>}
//       </label>
//       {help && <div style={styles.help}>{help}</div>}
//       {error && <div style={styles.error}>{error}</div>}
//     </div>
//   );
// };

// // ===== 3B. TOGGLE WIDGET (Yes/No Radio Buttons) - Plasmic-compatible =====
// const ToggleField = ({ 
//   label, 
//   value, 
//   onChange, 
//   required = false,
//   help,
//   error,
//   inline = false,
//   customCss,
//   ...props 
// }: any) => {
//   const yesValue = true;
//   const noValue = false;
  
//   // Base container style - always inline for toggle
//   // In RTL: label on right, radio buttons on left
//   // All styles inline for Plasmic compatibility
//   const baseContainerStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row-reverse' as const, // RTL: label first (right), then radio buttons (left)
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     gap: '20px',
//     width: '100%',
//     maxWidth: '100%',
//     direction: 'rtl',
//     textAlign: 'right' as const,
//     marginBottom: '12px',
//     flexWrap: 'nowrap',
//     boxSizing: 'border-box' as const,
//     // Important: ensure these work in Plasmic's scoped DOM
//     WebkitBoxDirection: 'reverse' as any,
//     WebkitBoxOrient: 'horizontal' as any,
//   };

//   // Merge custom CSS but preserve critical flexbox properties
//   // This ensures Plasmic's wrapper doesn't break the layout
//   const containerStyle: React.CSSProperties = {
//     ...baseContainerStyle,
//     ...customCss,
//     // Force these critical properties (Plasmic-safe)
//     display: 'flex',
//     flexDirection: 'row-reverse' as const,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     flexWrap: 'nowrap',
//     direction: 'rtl',
//   };

//   const radioGroupStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row-reverse' as const,
//     gap: '16px',
//     alignItems: 'center',
//     flexShrink: 0,
//     flexGrow: 0,
//     minWidth: 'fit-content',
//     // Ensure RTL in Plasmic
//     direction: 'rtl',
//   };

//   const radioLabelStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row-reverse' as const,
//     alignItems: 'center',
//     gap: '6px',
//     cursor: 'pointer',
//     fontSize: '15px',
//     fontFamily: 'B Nazanin, Tahoma, Arial',
//     color: '#262626',
//     whiteSpace: 'nowrap',
//     direction: 'rtl',
//     userSelect: 'none' as const,
//   };

//   const radioInputStyle: React.CSSProperties = {
//     width: '18px',
//     height: '18px',
//     cursor: 'pointer',
//     margin: 0,
//     flexShrink: 0,
//   };

//   // Handle undefined/null values - treat as unselected
//   const currentValue = value === true ? yesValue : (value === false ? noValue : undefined);

//   return (
//     <div style={containerStyle}>
//       {label && (
//         <span style={{
//           fontWeight: 'bold',
//           fontSize: '15px',
//           fontFamily: 'B Nazanin, Tahoma, Arial',
//           color: '#262626',
//           whiteSpace: 'nowrap',
//           flexShrink: 0,
//           flexGrow: 0,
//           direction: 'rtl',
//           textAlign: 'right',
//           marginLeft: 'auto', // Push to right in RTL flex container
//         }}>
//           {label}
//           {required && <span style={{ color: '#ff4d4f', marginRight: '2px' }}> *</span>}
//         </span>
//       )}
//       <div style={radioGroupStyle}>
//         <label style={radioLabelStyle}>
//           <input
//             type="radio"
//             style={radioInputStyle}
//             checked={currentValue === yesValue}
//             onChange={() => onChange(yesValue)}
//             {...props}
//           />
//           <span style={{ direction: 'rtl' }}>بله</span>
//         </label>
//         <label style={radioLabelStyle}>
//           <input
//             type="radio"
//             style={radioInputStyle}
//             checked={currentValue === noValue}
//             onChange={() => onChange(noValue)}
//             {...props}
//           />
//           <span style={{ direction: 'rtl' }}>خیر</span>
//         </label>
//       </div>
//       {help && (
//         <div style={{ 
//           ...styles.help, 
//           width: '100%', 
//           direction: 'rtl',
//           textAlign: 'right',
//           marginTop: '4px',
//         }}>
//           {help}
//         </div>
//       )}
//       {error && (
//         <div style={{ 
//           ...styles.error, 
//           width: '100%',
//           direction: 'rtl',
//           textAlign: 'right',
//           marginTop: '4px',
//         }}>
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// // ===== 4. MULTI CHOICE WIDGET (Checkbox Group) =====
// const MultiChoiceField = ({ 
//   label, 
//   options, 
//   value = [], 
//   onChange, 
//   required = false,
//   help,
//   error,
//   ...props 
// }: any) => (
//   <FormField label={label} required={required} help={help} error={error}>
//     <div style={{ width: '100%', textAlign: 'right' as const, direction: 'rtl' as const }}>
//       {options?.map((opt: any) => (
//         <label key={opt.value} style={styles.checkbox}>
//           <input
//             type="checkbox"
//             style={styles.checkboxInput}
//             checked={value.includes(opt.value)}
//             onChange={(e) => {
//               if (e.target.checked) {
//                 onChange([...value, opt.value]);
//               } else {
//                 onChange(value.filter((v: any) => v !== opt.value));
//               }
//             }}
//             {...props}
//           />
//           <span style={styles.checkboxLabel}>{opt.label}</span>
//         </label>
//       ))}
//     </div>
//   </FormField>
// );

// // ===== 5. SINGLE CHOICE WIDGET (Select) =====
// const SingleChoiceField = ({ 
//   label, 
//   options, 
//   value, 
//   onChange, 
//   required = false,
//   help,
//   error,
//   ...props 
// }: any) => (
//   <FormField label={label} required={required} help={help} error={error}>
//     <select
//       style={styles.select}
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//       {...props}
//     >
//       <option value="">انتخاب کنید...</option>
//       {options?.map((opt: any) => (
//         <option key={opt.value} value={opt.value}>
//           {opt.label}
//         </option>
//       ))}
//     </select>
//   </FormField>
// );

// // ===== 6. DATETIME WIDGET =====
// const DateTimeField = ({ 
//   label, 
//   value, 
//   onChange, 
//   placeholder,
//   required = false,
//   help,
//   error,
//   ...props 
// }: any) => (
//   <FormField label={label} required={required} help={help} error={error}>
//     <input
//       style={styles.input}
//       value={value || ""}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder || "YYYY/MM/DD HH:mm"}
//       type="datetime-local"
//       {...props}
//     />
//   </FormField>
// );

// // ===== 7. UPLOAD FILE WIDGET =====
// const UploadFileField = ({ 
//   label, 
//   value = [], 
//   onChange, 
//   required = false,
//   help,
//   error,
//   accept,
//   maxCount = 1,
//   maxSize = 10, // MB
//   ...props 
// }: any) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
    
//     // Validate file size
//     const validFiles = files.filter(file => {
//       const isValidSize = file.size / 1024 / 1024 < maxSize;
//       if (!isValidSize) {
//         alert(`فایل ${file.name} باید کوچکتر از ${maxSize}MB باشد!`);
//       }
//       return isValidSize;
//     });
    
//     // Validate file type
//     const finalFiles = validFiles.filter(file => {
//       if (!accept) return true;
//       const isValidType = accept.split(',').some((type: string) => 
//         file.type.includes(type.trim()) || file.name.endsWith(type.trim())
//       );
//       if (!isValidType) {
//         alert(`فایل ${file.name} باید از نوع ${accept} باشد!`);
//       }
//       return isValidType;
//     });
    
//     onChange(finalFiles.map(file => ({ name: file.name, file })));
//   };

//   return (
//     <FormField label={label} required={required} help={help} error={error}>
//       <div>
//         <input
//           type="file"
//           style={styles.fileInput}
//           accept={accept}
//           multiple={maxCount > 1}
//           onChange={handleFileChange}
//           {...props}
//         />
//         <div style={styles.fileButton}>
//           📁 انتخاب فایل
//         </div>
//         {value.length > 0 && (
//           <div style={{ marginTop: '8px', fontSize: '14px', color: '#8c8c8c' }}>
//             فایل‌های انتخاب شده: {value.map((f: any) => f.name).join(', ')}
//           </div>
//         )}
//       </div>
//     </FormField>
//   );
// };

// /* ---------------------------------------------
//    Form summary container (full layout)
// ---------------------------------------------- */
// const SimpleFormSummary = ({ 
//   title, 
//   description, 
//   children, 
//   onSubmit,
//   loading = false,
//   ...props 
// }: any) => (
//   <div style={{ ...styles.card, ...props }}>
//     <div style={styles.title}>{title}</div>
//     {description && <div style={styles.description}>{description}</div>}
    
//     {/* Dynamic fields rendered here */}
//     {children}
    
//     <button
//       style={styles.button}
//       onClick={onSubmit}
//       disabled={loading}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.backgroundColor = '#40a9ff';
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.backgroundColor = '#1890ff';
//       }}
//     >
//       {loading ? 'در حال ارسال...' : 'ارسال فرم'}
//     </button>
//   </div>
// );

// /* ---------------------------------------------
//    RJSF Widgets for your required field types
// ---------------------------------------------- */

// // ===== 1. TEXTBOX WIDGET =====
// const TextWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <TextboxField
//       label={undefined}
//       value={props.value}
//       onChange={props.onChange}
//       placeholder={props.placeholder}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//       type={props.schema?.format === "email" ? "email" : 
//             props.schema?.format === "uri" ? "url" : "text"}
//     />
//   );
// };

// // ===== 2. TEXTAREA WIDGET =====
// const TextareaWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <TextareaField
//       label={undefined}
//       value={props.value}
//       onChange={props.onChange}
//       placeholder={props.placeholder}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//       rows={props.options?.rows || 4}
//       maxLength={props.schema?.maxLength}
//     />
//   );
// };

// // ===== 3. CHECKBOX WIDGET =====
// const CheckboxWidget = (props: any) => {
//   // Priority: schema.title > ui:options.fieldLabel > props.label
//   // Always prefer schema.title as it contains the Persian title from the schema
//   const schemaTitle = props.schema?.title && props.schema.title.trim() !== '';
//   const labelFromOptions = props.options?.fieldLabel && props.options.fieldLabel.trim() !== '';
//   const propsLabel = props.label && props.label.trim() !== '';
  
//   const label = schemaTitle
//     ? props.schema.title
//     : (labelFromOptions
//         ? props.options.fieldLabel
//         : (propsLabel
//             ? props.label
//             : ''));
  
//   return (
//     <CheckboxField
//       label={label}
//       value={props.value}
//       onChange={props.onChange}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//     />
//   );
// };

// // ===== 3B. TOGGLE WIDGET (Switch-style toggle) =====
// // Uses ToggleField component directly
// const ToggleWidget = (props: any) => {
//   // Get label from schema.title (Persian title)
//   const schemaTitle = props.schema?.title && props.schema.title.trim() !== '';
//   const label = schemaTitle ? props.schema.title : (props.label || '');
  
//   // Get custom CSS from options
//   const customCss = props.options?.css || {};
//   const inline = props.options?.inline !== false;
  
//   return (
//     <ToggleField
//       value={props.value}
//       onChange={props.onChange}
//       label={label}
//       required={props.required}
//       disabled={props.disabled}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//       inline={inline}
//       customCss={customCss}
//     />
//   );
// };

// // ===== 4. MULTI CHOICE WIDGET =====
// const MultiChoiceWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <MultiChoiceField
//       label={undefined}
//       options={props.options?.enumOptions || []}
//       value={props.value || []}
//       onChange={props.onChange}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//     />
//   );
// };

// // ===== 5. SINGLE CHOICE WIDGET =====
// const SingleChoiceWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <SingleChoiceField
//       label={undefined}
//       options={props.options?.enumOptions || []}
//       value={props.value}
//       onChange={props.onChange}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//     />
//   );
// };

// // ===== 6. DATETIME WIDGET =====
// const DateTimeWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <DateTimeField
//       label={undefined}
//       value={props.value}
//       onChange={props.onChange}
//       placeholder={props.placeholder}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//     />
//   );
// };

// // ===== 7. UPLOAD FILE WIDGET =====
// const UploadFileWidget = (props: any) => {
//   // Don't pass label to FormField - FieldTemplate will show schema.title
//   // This prevents duplicate labels
//   return (
//     <UploadFileField
//       label={undefined}
//       value={props.value || []}
//       onChange={props.onChange}
//       required={props.required}
//       help={props.help}
//       error={props.rawErrors?.[0]}
//       accept={props.options?.accept}
//       maxCount={props.options?.maxCount || 1}
//       maxSize={props.options?.maxSize || 10}
//     />
//   );
// };

// // ===== Custom RADIO WIDGET =====
// const RadioWidget = (props: any) => {
//   const { id, value, onChange, options, disabled, readonly, schema, label } = props;
//   const enumOptions = options?.enumOptions || [];
//   const inline = options?.inline !== false; // default inline true
//   const displayLabel =
//     (schema?.title && schema.title.trim() !== '' && schema.title) ||
//     (label && label.trim() !== '' ? label : undefined);

//   const groupStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: inline ? ('row-reverse' as const) : ('column' as const),
//     alignItems: inline ? ('center' as const) : ('flex-start' as const),
//     justifyContent: 'flex-start',
//     gap: inline ? '16px' : '8px',
//     flexWrap: inline ? ('wrap' as const) : ('nowrap' as const),
//     direction: 'rtl',
//     textAlign: 'right' as const,
//     width: '100%',
//   };

//   const optionStyle: React.CSSProperties = {
//     display: 'inline-flex',
//     flexDirection: 'row-reverse' as const,
//     alignItems: 'center',
//     gap: '6px',
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     fontFamily: baseFontFamily,
//     fontSize: '15px',
//     color: '#262626',
//     whiteSpace: 'nowrap' as const,
//   };

//   const radioInputStyle: React.CSSProperties = {
//     width: '18px',
//     height: '18px',
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     margin: 0,
//   };

//   const handleChange = (newValue: any) => {
//     if (!disabled && !readonly) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row-reverse',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//         gap: '16px',
//         width: '100%',
//         direction: 'rtl',
//         textAlign: 'right',
//         flexWrap: inline ? ('wrap' as const) : ('nowrap' as const),
//       }}
//       id={id}
//     >
//       {displayLabel && (
//         <span
//           style={{
//             fontWeight: 'bold',
//             fontSize: '15px',
//             fontFamily: baseFontFamily,
//             color: '#262626',
//             whiteSpace: 'nowrap',
//             flexShrink: 0,
//           }}
//         >
//           {displayLabel}
//         </span>
//       )}
//       <div style={groupStyle}>
//         {enumOptions.map((option: any) => (
//           <label key={option.value} style={optionStyle}>
//             <input
//               type="radio"
//               name={id}
//               value={option.value}
//               checked={value === option.value}
//               onChange={() => handleChange(option.value)}
//               disabled={disabled}
//               style={radioInputStyle}
//             />
//             <span>{option.label}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// };

// /* ---------------------------------------------
//    Custom FieldTemplate for RTL Persian titles (Plasmic-compatible)
//    - Shows schema.title once per field (no duplication)
//    - Respects ui:options.label flag
//    - Supports inline layout for toggles
//    - All styles are inline (works in Plasmic's scoped DOM)
//    - Full RTL support
// ---------------------------------------------- */
// const FieldTemplate = (props: any) => {
//   const {
//     id,
//     classNames,
//     style,
//     label,
//     help,
//     required,
//     description,
//     errors,
//     children,
//     schema,
//     uiSchema,
//   } = props;

//   // Check if label should be hidden (for checkboxes, toggles, etc.)
//   const hideLabel = uiSchema?.["ui:options"]?.label === false;
//   const showLabel = !hideLabel && (label || schema?.title);

//   return (
//     <div
//       className={classNames}
//       style={{
//         ...style,
//         marginBottom: '16px',
//         direction: 'rtl',
//         textAlign: 'right',
//       }}
//     >
//       {showLabel && (
//         <label
//           htmlFor={id}
//           style={{
//             display: 'block',
//             fontSize: '16px',
//             fontWeight: '600',
//             color: '#262626',
//             fontFamily: baseFontFamily,
//             marginBottom: '8px',
//             direction: 'rtl',
//             textAlign: 'right',
//           }}
//         >
//           {label || schema?.title}
//           {required && (
//             <span style={{ color: '#ff4d4f', marginRight: '2px' }}> *</span>
//           )}
//         </label>
//       )}
//       {description && (
//         <div
//           style={{
//             fontSize: '14px',
//             color: '#8c8c8c',
//             marginBottom: '8px',
//             direction: 'rtl',
//             textAlign: 'right',
//           }}
//         >
//           {description}
//         </div>
//       )}
//       <div>{children}</div>
//       {errors && errors.length > 0 && (
//         <div
//           style={{
//             color: '#ff4d4f',
//             fontSize: '14px',
//             marginTop: '4px',
//             direction: 'rtl',
//             textAlign: 'right',
//           }}
//         >
//           {errors.map((error: string, i: number) => (
//             <div key={i}>{error}</div>
//           ))}
//         </div>
//       )}
//       {help && (
//         <div
//           style={{
//             fontSize: '14px',
//             color: '#8c8c8c',
//             marginTop: '4px',
//             direction: 'rtl',
//             textAlign: 'right',
//           }}
//         >
//           {help}
//         </div>
//       )}
//     </div>
//   );
// };

// /* ---------------------------------------------
//    RJSF Theme Configuration
// ---------------------------------------------- */
// const customRJSFTheme = {
//   // Base theme structure - we define all widgets ourselves
//   Widgets: {
//     // ===== YOUR REQUIRED WIDGETS =====
//     TextWidget,
//     TextareaWidget,
//     CheckboxWidget,
//     RadioWidget,
//     ToggleWidget, // Toggle widget for Yes/No radio buttons
//     MultiChoiceWidget,
//     SingleChoiceWidget,
//     DateTimeWidget,
//     UploadFileWidget,
//   },
//   // Custom FieldTemplate to handle label hiding for checkboxes and inline layout
//   FieldTemplate,
// };

// /* ---------------------------------------------
//    Export palette for Plasmic Host registration
// ---------------------------------------------- */
// export const FormDesignPalette = {
//   // ===== YOUR REQUIRED COMPONENTS =====
//   FormField,
//   TextboxField,
//   TextareaField,
//   CheckboxField,
//   MultiChoiceField,
//   SingleChoiceField,
//   DateTimeField,
//   UploadFileField,
//   SimpleFormSummary,

//   RJSFWidgets: {
//     // ===== YOUR REQUIRED RJSF WIDGETS =====
//     TextWidget,
//     TextareaWidget,
//     CheckboxWidget,
//     RadioWidget,
//     MultiChoiceWidget,
//     SingleChoiceWidget,
//     DateTimeWidget,
//     UploadFileWidget,
//   },
// };

// export { customRJSFTheme };
// export default FormDesignPalette;