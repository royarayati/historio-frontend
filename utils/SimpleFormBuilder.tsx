"use client";
import React, { useEffect, useState } from "react";
// ===== COMMENTED OUT CHAKRA UI IMPORTS =====
// import {
//   Box,
//   Heading,
//   Button,
//   Spinner,
//   Alert,
//   AlertIcon,
// } from "@chakra-ui/react";

// ===== COMMENTED OUT ANT DESIGN IMPORTS (CAUSING RC-UTIL ERROR) =====
// import {
//   Card,
//   Typography,
//   Button,
//   Spin,
//   Alert,
//   Space,
//   message,
// } from "antd";

// ===== PURE REACT + CSS SOLUTION (NO EXTERNAL UI LIBRARY) =====
import { withTheme } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { CodeComponentMeta } from "@plasmicapp/host";
import { customRJSFTheme, FormDesignPalette } from "./FormDesignPalette";

// Extract components from FormDesignPalette
const { TextboxField, TextareaField, CheckboxField, MultiChoiceField } = FormDesignPalette;

// Simple form field types
export interface FormField {
  id: string;
  type: "text" | "textarea" | "checkbox" | "multipleChoice";
  title: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>; // For multipleChoice
  defaultValue?: any;
}

export interface JsonFormData {
  title?: string;
  description?: string;
  fields: FormField[];
}

export interface SimpleFormBuilderProps {
  templateId?: string;
  submitUrl?: string;
  patientContext?: Record<string, any>;
  onSubmitData?: (result: any) => void;
  className?: string;
  style?: React.CSSProperties;
  // New prop: Direct JSON form data
  formData?: JsonFormData;
  onSubmit?: (formValues: Record<string, any>) => void;
  onChange?: (formValues: Record<string, any>) => void;
}

// Use custom theme from FormDesignPalette
const Form = withTheme(customRJSFTheme as any);

/* ---------------------------------------------
   CSS Styles for Beautiful Components
---------------------------------------------- */
const styles = {
  container: {
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    padding: '8px', // Minimal padding on mobile
    boxSizing: 'border-box' as const,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px', // Even more reduced padding for mobile
    border: '1px solid #f0f0f0',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box' as const,
    margin: '0',
  },
  title: {
    fontSize: '20px', // Smaller on mobile
    fontWeight: 'bold',
    color: '#1890ff',
    textAlign: 'center' as const,
    marginBottom: '20px', // Reduced margin
    lineHeight: '1.3', // Better line height for mobile
  },
  loading: {
    textAlign: 'center' as const,
    padding: '48px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1890ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    fontSize: '16px',
    color: '#8c8c8c',
  },
  alert: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    border: '1px solid',
  },
  alertError: {
    backgroundColor: '#fff2f0',
    borderColor: '#ffccc7',
    color: '#ff4d4f',
  },
  alertInfo: {
    backgroundColor: '#f6ffed',
    borderColor: '#b7eb8f',
    color: '#52c41a',
  },
  button: {
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    marginTop: '24px',
  },
  buttonHover: {
    backgroundColor: '#40a9ff',
  },
  message: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    zIndex: 1000,
    maxWidth: '300px',
  },
  messageSuccess: {
    backgroundColor: '#52c41a',
  },
  messageError: {
    backgroundColor: '#ff4d4f',
  },
};

// Simple message system
const showMessage = (text: string, type: 'success' | 'error') => {
  const messageEl = document.createElement('div');
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    max-width: 300px;
    background-color: ${type === 'success' ? '#52c41a' : '#ff4d4f'};
  `;
  messageEl.textContent = text;
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    if (document.body.contains(messageEl)) {
      document.body.removeChild(messageEl);
    }
  }, 3000);
};

// Convert simple JSON form data to JSON Schema format for RJSF
const convertToJsonSchema = (formData: JsonFormData): { schema: any; uiSchema: any } => {
  const properties: any = {};
  const required: string[] = [];
  const uiSchema: any = {};

  formData.fields.forEach((field) => {
    if (field.required) {
      required.push(field.id);
    }

    switch (field.type) {
      case "text":
        properties[field.id] = {
          type: "string",
          title: field.title,
          default: field.defaultValue,
        };
        if (field.placeholder) {
          uiSchema[field.id] = {
            "ui:placeholder": field.placeholder,
          };
        }
        break;

      case "textarea":
        properties[field.id] = {
          type: "string",
          title: field.title,
          default: field.defaultValue,
        };
        uiSchema[field.id] = {
          "ui:widget": "textarea",
          ...(field.placeholder ? { "ui:placeholder": field.placeholder } : {}),
        };
        break;

      case "checkbox":
        properties[field.id] = {
          type: "boolean",
          title: field.title,
          default: field.defaultValue || false,
        };
        break;

      case "multipleChoice":
        properties[field.id] = {
          type: "array",
          title: field.title,
          items: {
            type: "string",
            enum: field.options?.map((opt) => opt.value) || [],
          },
          uniqueItems: true,
          default: field.defaultValue || [],
        };
        uiSchema[field.id] = {
          "ui:widget": "checkboxes",
          "ui:options": {
            enumOptions: field.options?.map((opt) => ({
              label: opt.label,
              value: opt.value,
            })) || [],
          },
        };
        break;
    }
  });

  return {
    schema: {
      type: "object",
      title: formData.title,
      description: formData.description,
      properties,
      required,
    },
    uiSchema,
  };
};

// Custom form renderer for simple JSON format (without RJSF)
const SimpleFormRenderer: React.FC<{
  formData: JsonFormData;
  onSubmit?: (formValues: Record<string, any>) => void;
  onChange?: (formValues: Record<string, any>) => void;
}> = ({ formData, onSubmit, onChange }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    formData.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialValues[field.id] = field.defaultValue;
      } else if (field.type === "multipleChoice") {
        initialValues[field.id] = [];
      } else if (field.type === "checkbox") {
        initialValues[field.id] = false;
      } else {
        initialValues[field.id] = "";
      }
    });
    return initialValues;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (fieldId: string, value: any) => {
    const newValues = { ...formValues, [fieldId]: value };
    setFormValues(newValues);

    if (errors[fieldId]) {
      setErrors({ ...errors, [fieldId]: "" });
    }

    onChange?.(newValues);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formData.fields.forEach((field) => {
      if (field.required) {
        const value = formValues[field.id];
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newErrors[field.id] = `${field.title} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formData.fields.map((field) => {
        const value = formValues[field.id];
        const error = errors[field.id];

        return (
          <div key={field.id}>
            {field.type === "text" && (
              <TextboxField
                label={field.title}
                value={value || ""}
                onChange={(val: any) => handleFieldChange(field.id, val)}
                placeholder={field.placeholder}
                required={field.required}
                error={error}
              />
            )}

            {field.type === "textarea" && (
              <TextareaField
                label={field.title}
                value={value || ""}
                onChange={(val: any) => handleFieldChange(field.id, val)}
                placeholder={field.placeholder}
                required={field.required}
                error={error}
              />
            )}

            {field.type === "checkbox" && (
              <CheckboxField
                label={field.title}
                value={value}
                onChange={(val: any) => handleFieldChange(field.id, val)}
                required={field.required}
                error={error}
              />
            )}

            {field.type === "multipleChoice" && (
              <MultiChoiceField
                label={field.title}
                options={field.options || []}
                value={Array.isArray(value) ? value : []}
                onChange={(val: any) => handleFieldChange(field.id, val)}
                required={field.required}
                error={error}
              />
            )}
          </div>
        );
      })}

      {onSubmit && (
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#40a9ff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1890ff";
          }}
        >
          Submit
        </button>
      )}
    </form>
  );
};

export const SimpleFormBuilder: React.FC<SimpleFormBuilderProps> = ({
  templateId,
  submitUrl,
  patientContext,
  onSubmitData,
  className,
  style,
  formData,
  onSubmit,
  onChange,
}) => {
  const [schema, setSchema] = useState<any>(null);
  const [uiSchema, setUiSchema] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // If formData is provided, use direct JSON rendering mode
  useEffect(() => {
    if (formData) {
      // Convert simple JSON format to JSON Schema
      const { schema: convertedSchema, uiSchema: convertedUiSchema } = convertToJsonSchema(formData);
      setSchema(convertedSchema);
      setUiSchema(convertedUiSchema);
      return;
    }

    // Otherwise, use templateId mode (existing functionality)
    if (!templateId) return;

    const fetchTemplateSchema = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://inlabgr.synappsgroup.com/api/v3/remote_his_manual/templates${templateId ? `?template_id=${encodeURIComponent(templateId)}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Expecting { status_code: 200, data: { id, name, version, schema, ui_schema, ... } }
        const templateData = data?.data;
        const loadedSchema = templateData?.schema;
        const loadedUiSchema = templateData?.ui_schema || {};

        console.log("✅ Loaded schema", loadedSchema);

        setSchema(loadedSchema || {});
        setUiSchema(loadedUiSchema);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplateSchema();
  }, [templateId, formData]);

  const handleSubmit = async ({ formData: submittedData }: any) => {
    // If using direct formData prop with custom onSubmit
    if (formData && onSubmit) {
      onSubmit(submittedData);
      return;
    }

    // Otherwise, use existing templateId submission flow
    if (!templateId || !submitUrl) return;

    try {
      const payload = {
        form_data: submittedData,
        patient_context: patientContext || {},
        template_id: templateId,
      };

      const response = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`خطا در ارسال: ${response.status}`);
      }

      const result = await response.json();
      
      showMessage("فرم با موفقیت ارسال شد!", "success");
      onSubmitData?.(result);
    } catch (err: any) {
      console.error("Submit error:", err);
      showMessage(`خطا در ارسال فرم: ${err.message}`, "error");
    }
  };

  // If using direct formData with custom renderer (simpler, no RJSF dependency)
  if (formData && !templateId) {
    return (
      <div className={className} style={style}>
        <div style={styles.container}>
          <div style={styles.card}>
            {formData.title && <div style={styles.title}>{formData.title}</div>}
            {formData.description && (
              <div style={{ ...styles.loadingText, marginBottom: "20px" }}>
                {formData.description}
              </div>
            )}
            <SimpleFormRenderer
              formData={formData}
              onSubmit={onSubmit}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className={className} style={style}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>در حال بارگذاری قالب...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={className} style={style}>
        <div style={{ ...styles.alert, ...styles.alertError }}>
          <strong>خطا در واکشی قالب:</strong> {error}
        </div>
      </div>
    );

  if (!schema)
    return (
      <div className={className} style={style}>
        <div style={{ ...styles.alert, ...styles.alertInfo }}>
          <strong>اسکیمایی یافت نشد</strong><br />
          لطفاً templateId معتبری وارد کنید یا formData را وارد کنید
        </div>
      </div>
    );

  return (
    <div className={className} style={style}>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.title}>
            {formData?.title || `فرم پویا (Template ${templateId})`}
          </div>
          
          <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={handleSubmit}
            liveValidate
          >
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#40a9ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1890ff';
              }}
            >
              ارسال فرم
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const SimpleFormBuilderMeta: CodeComponentMeta<SimpleFormBuilderProps> = {
  name: "SimpleFormBuilder",
  displayName: "Simple Form Builder",
  description: "Dynamic form builder that accepts JSON data or templateId. Supports text, textarea, checkbox, and multiple choice fields.",
  importPath: "@/components/SimpleFormBuilder",
  props: {
    templateId: {
      type: "string",
      displayName: "Template ID",
      description: "Optional: Template ID to fetch schema from API",
    },
    submitUrl: {
      type: "string",
      displayName: "Submit URL",
      description: "Optional: URL to submit form data (used with templateId)",
    },
    formData: {
      type: "object",
      displayName: "Form Data",
      description: "Optional: Direct JSON form data with fields array. Example: { title: 'Form Title', fields: [{ id: 'name', type: 'text', title: 'Name', required: true }] }",
    },
    onSubmit: {
      type: "eventHandler",
      displayName: "On Submit",
      description: "Callback when form is submitted (used with formData)",
      argTypes: [{ name: "formValues", type: "object" }],
    },
    onChange: {
      type: "eventHandler",
      displayName: "On Change",
      description: "Callback when form values change (used with formData)",
      argTypes: [{ name: "formValues", type: "object" }],
    },
    patientContext: {
      type: "object",
      displayName: "Patient Context",
    },
    onSubmitData: {
      type: "eventHandler",
      displayName: "On Submit Data",
      argTypes: [{ name: "result", type: "object" }],
    },
    className: {
      type: "string",
      displayName: "CSS Class",
    },
    style: {
      type: "object",
      displayName: "Inline Styles",
    },
  },
};

export default SimpleFormBuilder;