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
// import * as AntdUI from "@rjsf/antd";

// /* ---------------------------------------------
//    CSS Styles for Beautiful Form Components
// ---------------------------------------------- */
// const styles = {
//   formField: {
//     marginBottom: '24px', // Increased gap between fields for better visibility
//     width: '100%',
//     textAlign: 'right' as const, // Right-align all fields
//     display: 'block',
//   },
//   label: {
//     display: 'block',
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#262626',
//     marginBottom: '12px', // Increased gap between label and input
//     textAlign: 'right' as const, // Right-align labels
//   },
//   required: {
//     color: '#ff4d4f',
//   },
//   input: {
//     width: '100%',
//     padding: '16px 20px', // Increased padding for better touch targets
//     fontSize: '16px',
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
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px', // Increased gap for better touch targets
//     marginBottom: '16px', // Increased spacing between checkboxes
//     padding: '8px 0', // Added padding for better touch area
//   },
//   checkboxInput: {
//     width: '20px', // Larger for better touch targets
//     height: '20px', // Larger for better touch targets
//     cursor: 'pointer',
//   },
//   checkboxLabel: {
//     fontSize: '16px',
//     color: '#262626',
//     cursor: 'pointer',
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
//   },
//   help: {
//     color: '#8c8c8c',
//     fontSize: '14px',
//     marginTop: '4px',
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#1890ff',
//     textAlign: 'right' as const,
//     marginBottom: '16px',
//   },
//   description: {
//     fontSize: '16px',
//     color: '#8c8c8c',
//     textAlign: 'right' as const,
//     marginBottom: '24px',
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
//   return (
//     <div style={styles.formField}>
//       {label && (
//         <div style={styles.label}>
//           {label}
//           {required && <span style={styles.required}> *</span>}
//         </div>
//       )}
//       <div style={{ textAlign: 'right' }}>
//         {children}
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
// }: any) => (
//   <FormField required={required} help={help} error={error}>
//     <label style={styles.checkbox}>
//       <input
//         type="checkbox"
//         style={styles.checkboxInput}
//         checked={!!value}
//         onChange={(e) => onChange(e.target.checked)}
//         {...props}
//       />
//       <span style={styles.checkboxLabel}>{label}</span>
//     </label>
//   </FormField>
// );

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
//     <div>
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
// const TextWidget = (props: any) => (
//   <TextboxField
//     label={props.label}
//     value={props.value}
//     onChange={props.onChange}
//     placeholder={props.placeholder}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//     type={props.schema?.format === "email" ? "email" : 
//           props.schema?.format === "uri" ? "url" : "text"}
//   />
// );

// // ===== 2. TEXTAREA WIDGET =====
// const TextareaWidget = (props: any) => (
//   <TextareaField
//     label={props.label}
//     value={props.value}
//     onChange={props.onChange}
//     placeholder={props.placeholder}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//     rows={props.options?.rows || 4}
//     maxLength={props.schema?.maxLength}
//   />
// );

// // ===== 3. CHECKBOX WIDGET =====
// const CheckboxWidget = (props: any) => (
//   <CheckboxField
//     label={props.label}
//     value={props.value}
//     onChange={props.onChange}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//   />
// );

// // ===== 4. MULTI CHOICE WIDGET =====
// const MultiChoiceWidget = (props: any) => (
//   <MultiChoiceField
//     label={props.label}
//     options={props.options?.enumOptions || []}
//     value={props.value || []}
//     onChange={props.onChange}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//   />
// );

// // ===== 5. SINGLE CHOICE WIDGET =====
// const SingleChoiceWidget = (props: any) => (
//   <SingleChoiceField
//     label={props.label}
//     options={props.options?.enumOptions || []}
//     value={props.value}
//     onChange={props.onChange}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//   />
// );

// // ===== 6. DATETIME WIDGET =====
// const DateTimeWidget = (props: any) => (
//   <DateTimeField
//     label={props.label}
//     value={props.value}
//     onChange={props.onChange}
//     placeholder={props.placeholder}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//   />
// );

// // ===== 7. UPLOAD FILE WIDGET =====
// const UploadFileWidget = (props: any) => (
//   <UploadFileField
//     label={props.label}
//     value={props.value || []}
//     onChange={props.onChange}
//     required={props.required}
//     help={props.help}
//     error={props.rawErrors?.[0]}
//     accept={props.options?.accept}
//     maxCount={props.options?.maxCount || 1}
//     maxSize={props.options?.maxSize || 10}
//   />
// );

// /* ---------------------------------------------
//    RJSF Theme Configuration
// ---------------------------------------------- */
// const customRJSFTheme = {
//   ...AntdUI,
//   Widgets: {
//     ...AntdUI.Widgets,
//     // ===== YOUR REQUIRED WIDGETS =====
//     TextWidget,
//     TextareaWidget,
//     CheckboxWidget,
//     MultiChoiceWidget,
//     SingleChoiceWidget,
//     DateTimeWidget,
//     UploadFileWidget,
//   },
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
//     MultiChoiceWidget,
//     SingleChoiceWidget,
//     DateTimeWidget,
//     UploadFileWidget,
//   },
// };

// export { customRJSFTheme };
// export default FormDesignPalette;