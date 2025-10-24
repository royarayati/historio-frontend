// "use client";
// import React, { useEffect, useState } from "react";
// // ===== COMMENTED OUT CHAKRA UI IMPORTS =====
// // import {
// //   Box,
// //   Heading,
// //   Button,
// //   Spinner,
// //   Alert,
// //   AlertIcon,
// // } from "@chakra-ui/react";

// // ===== COMMENTED OUT ANT DESIGN IMPORTS (CAUSING RC-UTIL ERROR) =====
// // import {
// //   Card,
// //   Typography,
// //   Button,
// //   Spin,
// //   Alert,
// //   Space,
// //   message,
// // } from "antd";

// // ===== PURE REACT + CSS SOLUTION (NO EXTERNAL UI LIBRARY) =====
// import { withTheme } from "@rjsf/core";
// import validator from "@rjsf/validator-ajv8";
// import { CodeComponentMeta } from "@plasmicapp/host";
// import { customRJSFTheme } from "./FormDesignPalette";

// // Use custom theme from FormDesignPalette
// const Form = withTheme(customRJSFTheme as any);

// /* ---------------------------------------------
//    CSS Styles for Beautiful Components
// ---------------------------------------------- */
// const styles = {
//   container: {
//     width: '100%',
//     maxWidth: '100%',
//     margin: '0',
//     padding: '8px', // Minimal padding on mobile
//     boxSizing: 'border-box' as const,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: '12px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     padding: '16px', // Even more reduced padding for mobile
//     border: '1px solid #f0f0f0',
//     width: '100%',
//     maxWidth: '100%',
//     boxSizing: 'border-box' as const,
//     margin: '0',
//   },
//   title: {
//     fontSize: '20px', // Smaller on mobile
//     fontWeight: 'bold',
//     color: '#1890ff',
//     textAlign: 'center' as const,
//     marginBottom: '20px', // Reduced margin
//     lineHeight: '1.3', // Better line height for mobile
//   },
//   loading: {
//     textAlign: 'center' as const,
//     padding: '48px',
//   },
//   spinner: {
//     width: '40px',
//     height: '40px',
//     border: '4px solid #f3f3f3',
//     borderTop: '4px solid #1890ff',
//     borderRadius: '50%',
//     animation: 'spin 1s linear infinite',
//     margin: '0 auto 16px',
//   },
//   loadingText: {
//     fontSize: '16px',
//     color: '#8c8c8c',
//   },
//   alert: {
//     padding: '16px',
//     borderRadius: '8px',
//     marginBottom: '16px',
//     border: '1px solid',
//   },
//   alertError: {
//     backgroundColor: '#fff2f0',
//     borderColor: '#ffccc7',
//     color: '#ff4d4f',
//   },
//   alertInfo: {
//     backgroundColor: '#f6ffed',
//     borderColor: '#b7eb8f',
//     color: '#52c41a',
//   },
//   button: {
//     backgroundColor: '#1890ff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '12px 24px',
//     fontSize: '16px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     width: '100%',
//     marginTop: '24px',
//   },
//   buttonHover: {
//     backgroundColor: '#40a9ff',
//   },
//   message: {
//     position: 'fixed',
//     top: '20px',
//     right: '20px',
//     padding: '12px 20px',
//     borderRadius: '8px',
//     color: 'white',
//     fontWeight: '600',
//     zIndex: 1000,
//     maxWidth: '300px',
//   },
//   messageSuccess: {
//     backgroundColor: '#52c41a',
//   },
//   messageError: {
//     backgroundColor: '#ff4d4f',
//   },
// };

// // Simple message system
// const showMessage = (text: string, type: 'success' | 'error') => {
//   const messageEl = document.createElement('div');
//   messageEl.style.cssText = `
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     padding: 12px 20px;
//     border-radius: 8px;
//     color: white;
//     font-weight: 600;
//     z-index: 1000;
//     max-width: 300px;
//     background-color: ${type === 'success' ? '#52c41a' : '#ff4d4f'};
//   `;
//   messageEl.textContent = text;
//   document.body.appendChild(messageEl);
  
//   setTimeout(() => {
//     document.body.removeChild(messageEl);
//   }, 3000);
// };

// export interface SimpleFormBuilderProps {
//   templateId: string;
//   submitUrl: string;
//   patientContext?: Record<string, any>;
//   onSubmitData?: (result: any) => void;
//   className?: string;
//   style?: React.CSSProperties;
// }

// export const SimpleFormBuilder: React.FC<SimpleFormBuilderProps> = ({
//   templateId,
//   submitUrl,
//   patientContext,
//   onSubmitData,
//   className,
//   style,
// }) => {
//   const [schema, setSchema] = useState<any>(null);
//   const [uiSchema, setUiSchema] = useState<any>({});
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!templateId) return;

//     const fetchTemplateSchema = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await fetch(
//           `https://inlabgr.synappsgroup.com/api/v3/remote_his_manual/templates/${templateId}`
//         );
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const data = await res.json();

//         // 👇 طبق پاسخ واقعی سرور:
//         const loadedSchema = data?.items?.schema;

//         console.log("✅ Loaded schema", loadedSchema);

//         setSchema(loadedSchema || {});
//         setUiSchema({});
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTemplateSchema();
//   }, [templateId]);

//   const handleSubmit = async ({ formData }: any) => {
//     try {
//       const payload = {
//         form_data: formData,
//         patient_context: patientContext || {},
//         template_id: templateId,
//       };

//       const response = await fetch(submitUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error(`خطا در ارسال: ${response.status}`);
//       }

//       const result = await response.json();
      
//       showMessage("فرم با موفقیت ارسال شد!", "success");
//       onSubmitData?.(result);
//     } catch (err: any) {
//       console.error("Submit error:", err);
//       showMessage(`خطا در ارسال فرم: ${err.message}`, "error");
//     }
//   };

//   if (loading)
//     return (
//       <div className={className} style={style}>
//         <div style={styles.loading}>
//           <div style={styles.spinner}></div>
//           <div style={styles.loadingText}>در حال بارگذاری قالب...</div>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className={className} style={style}>
//         <div style={{ ...styles.alert, ...styles.alertError }}>
//           <strong>خطا در واکشی قالب:</strong> {error}
//         </div>
//       </div>
//     );

//   if (!schema)
//     return (
//       <div className={className} style={style}>
//         <div style={{ ...styles.alert, ...styles.alertInfo }}>
//           <strong>اسکیمایی یافت نشد</strong><br />
//           لطفاً templateId معتبری وارد کنید
//         </div>
//       </div>
//     );

//   return (
//     <div className={className} style={style}>
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <div style={styles.title}>
//             فرم پویا (Template {templateId})
//           </div>
          
//           <Form
//             schema={schema}
//             uiSchema={uiSchema}
//             validator={validator}
//             onSubmit={handleSubmit}
//             liveValidate
//           >
//             <button
//               type="submit"
//               style={styles.button}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#40a9ff';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#1890ff';
//               }}
//             >
//               ارسال فرم
//             </button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const SimpleFormBuilderMeta: CodeComponentMeta<SimpleFormBuilderProps> = {
//   name: "SimpleFormBuilder",
//   displayName: "Simple Form Builder",
//   description: "Dynamic clinical template form integrated with Plasmic Studio",
//   importPath: "@/components/SimpleFormBuilder",
//   props: {
//     templateId: {
//       type: "string",
//       displayName: "Template ID",
//     },
//     submitUrl: {
//       type: "string",
//       displayName: "Submit URL",
//     },
//     patientContext: {
//       type: "object",
//       displayName: "Patient Context",
//     },
//     onSubmitData: {
//       type: "eventHandler",
//       displayName: "On Submit Data",
//       argTypes: [{ name: "result", type: "object" }],
//     },
//     className: {
//       type: "string",
//       displayName: "CSS Class",
//     },
//     style: {
//       type: "object",
//       displayName: "Inline Styles",
//     },
//   },
// };

// export default SimpleFormBuilder;