"use client";
import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme, Switch, FormControl, FormLabel, Box, Input, Image, Text, Button, Heading, Divider } from "@chakra-ui/react";
import validator from "@rjsf/validator-ajv8";
import { CodeComponentMeta } from "@plasmicapp/host";
import { WidgetProps, ObjectFieldTemplateProps } from "@rjsf/utils";
// Chakra UI Theme - Good RTL support
import Form from "@rjsf/chakra-ui";

// Create Chakra UI theme with RTL support for Farsi/Persian
const theme = extendTheme({
  direction: "rtl",
  fonts: {
    body: "Vazirmatn, sans-serif",
    heading: "Vazirmatn, sans-serif",
    mono: "Vazirmatn, monospace",
  },
  styles: {
    global: {
      body: {
        fontFamily: "Vazirmatn, sans-serif",
      },
      "*": {
        fontFamily: "Vazirmatn, sans-serif !important",
      },
    },
  },
});

// Simple form field components (replacing FormDesignPalette which is commented out)
const TextboxField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}> = ({ label, value, onChange, placeholder, required, error }) => (
  <div style={{ marginBottom: "12px", direction: "rtl", textAlign: "right" }}>
    <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", fontFamily: "Vazirmatn, sans-serif" }}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "8px 12px",
        border: error ? "1px solid red" : "1px solid #d9d9d9",
        borderRadius: "4px",
        fontFamily: "Vazirmatn, sans-serif",
        direction: "rtl",
        textAlign: "right",
      }}
    />
    {error && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
  </div>
);

const TextareaField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}> = ({ label, value, onChange, placeholder, required, error }) => (
  <div style={{ marginBottom: "12px", direction: "rtl", textAlign: "right" }}>
    <label style={{ display: "block", marginBottom: "4px", fontWeight: "500", fontFamily: "Vazirmatn, sans-serif" }}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "8px 12px",
        border: error ? "1px solid red" : "1px solid #d9d9d9",
        borderRadius: "4px",
        fontFamily: "Vazirmatn, sans-serif",
        direction: "rtl",
        textAlign: "right",
        minHeight: "80px",
      }}
    />
    {error && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
  </div>
);

const CheckboxField: React.FC<{
  label: string;
  value: boolean;
  onChange: (val: boolean) => void;
  required?: boolean;
  error?: string;
}> = ({ label, value, onChange, required, error }) => (
  <div style={{ marginBottom: "12px", direction: "rtl", textAlign: "right" }}>
    <label style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "Vazirmatn, sans-serif", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        style={{ cursor: "pointer" }}
      />
      <span>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </span>
    </label>
    {error && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
  </div>
);

const MultiChoiceField: React.FC<{
  label: string;
  options: Array<{ label: string; value: string }>;
  value: string[];
  onChange: (val: string[]) => void;
  required?: boolean;
  error?: string;
}> = ({ label, options, value, onChange, required, error }) => (
  <div style={{ marginBottom: "12px", direction: "rtl", textAlign: "right" }}>
    <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", fontFamily: "Vazirmatn, sans-serif" }}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {options.map((option) => (
        <label
          key={option.value}
          style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "Vazirmatn, sans-serif", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={value.includes(option.value)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, option.value]);
              } else {
                onChange(value.filter((v) => v !== option.value));
              }
            }}
            style={{ cursor: "pointer" }}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {error && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{error}</div>}
  </div>
);

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
  mode?: "template" | "filled_form";
  templateId?: string;
  submissionId?: string;
  patientId?: string;
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

// Custom Toggle Widget for Chakra UI
const ToggleWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    schema,
    uiSchema,
  } = props;

  const uiOptions = uiSchema?.["ui:options"] || {};
  const label = schema?.title || "";
  const showLabel = uiOptions.label !== false;
  const cssOptions = (uiOptions.css && typeof uiOptions.css === "object" && !Array.isArray(uiOptions.css)) 
    ? uiOptions.css as Record<string, any>
    : {};
  const isRTL = uiOptions.dir === "rtl" || true; // Default to RTL

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    onChange(newValue);
  };

  const containerStyle: React.CSSProperties = {
    width: (cssOptions.width as string) || "100%",
    display: (cssOptions.display as string) || "flex",
    alignItems: (cssOptions.alignItems as string) || "center",
    flexDirection: (cssOptions.flexDirection as React.CSSProperties["flexDirection"]) || (isRTL ? "row-reverse" : "row"),
    justifyContent: (cssOptions.justifyContent as string) || "space-between",
    marginBottom: "12px",
    fontFamily: "Vazirmatn, sans-serif",
  };

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      style={containerStyle}
    >
      <FormControl
        id={id}
        isDisabled={disabled || readonly}
      >
        {showLabel && label && (
          <FormLabel
            htmlFor={id}
            mb={0}
            mr={isRTL ? 0 : 2}
            ml={isRTL ? 2 : 0}
            style={{
              fontFamily: "Vazirmatn, sans-serif",
              cursor: disabled || readonly ? "not-allowed" : "pointer",
            }}
          >
            {label}
          </FormLabel>
        )}
        <Switch
          id={id}
          isChecked={value || false}
          onChange={handleChange}
          onBlur={() => onBlur(id, value)}
          onFocus={() => onFocus(id, value)}
          isDisabled={disabled || readonly}
          colorScheme="blue"
          size="md"
        />
      </FormControl>
    </Box>
  );
};

// Custom File Upload Widget for Chakra UI
const FileWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    schema,
    uiSchema,
  } = props;

  const uiOptions = uiSchema?.["ui:options"] || {};
  const label = schema?.title || "";
  const accept = (typeof uiOptions.accept === "string" ? uiOptions.accept : "*/*");
  const isRTL = uiOptions.dir === "rtl" || true; // Default to RTL
  const format = schema?.format || "";

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  // Load existing value if it's a data URL
  useEffect(() => {
    if (value && typeof value === "string" && value.startsWith("data:")) {
      setPreview(value);
      // Try to extract filename from data URL if possible
      const match = value.match(/filename=([^;]+)/);
      if (match) {
        setFileName(match[1]);
      } else {
        setFileName("تصویر بارگذاری شده");
      }
    } else if (value) {
      setPreview("");
      setFileName("");
    }
  }, [value]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onChange(undefined);
      setFileName("");
      setPreview("");
      return;
    }

    setFileName(file.name);

    // If format is data-url, convert to base64
    if (format === "data-url") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onChange(dataUrl);
        setPreview(dataUrl);
        onBlur(id, dataUrl);
      };
      reader.onerror = () => {
        console.error("Error reading file");
        onChange(undefined);
        setFileName("");
        setPreview("");
      };
      reader.readAsDataURL(file);
    } else {
      // For other formats, just store the file name or handle differently
      onChange(file.name);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setFileName("");
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isImage = preview && preview.startsWith("data:image/");

  return (
    <FormControl
      id={id}
      isDisabled={disabled || readonly}
      dir={isRTL ? "rtl" : "ltr"}
      mb={4}
    >
      {label && (
        <FormLabel
          htmlFor={id}
          mb={2}
          fontFamily="Vazirmatn, sans-serif"
          textAlign={isRTL ? "right" : "left"}
        >
          {label}
        </FormLabel>
      )}
      
      <Box
        dir={isRTL ? "rtl" : "ltr"}
        fontFamily="Vazirmatn, sans-serif"
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          onBlur={() => onBlur(id, value)}
          onFocus={() => onFocus(id, value)}
          disabled={disabled || readonly}
          display="none"
        />
        
        <Button
          onClick={handleButtonClick}
          isDisabled={disabled || readonly}
          colorScheme="blue"
          size="md"
          mb={2}
          fontFamily="Vazirmatn, sans-serif"
        >
          {fileName ? "تغییر فایل" : "انتخاب فایل"}
        </Button>

        {fileName && (
          <Box mb={2}>
            <Text fontSize="sm" color="gray.600" fontFamily="Vazirmatn, sans-serif">
              {fileName}
            </Text>
            <Button
              onClick={handleRemove}
              size="sm"
              colorScheme="red"
              variant="outline"
              ml={2}
              fontFamily="Vazirmatn, sans-serif"
            >
              حذف
            </Button>
          </Box>
        )}

        {isImage && preview && (
          <Box mt={2}>
            <Image
              src={preview}
              alt="Preview"
              maxH="200px"
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
            />
          </Box>
        )}
      </Box>
    </FormControl>
  );
};

// Custom ObjectFieldTemplate to show section titles for nested objects
const CustomObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const {
    title,
    description,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
    registry,
  } = props;

  // Check if this is the root object
  // Root object has $id === "root", nested objects have $id like "root_general_appearance"
  const isRoot = idSchema.$id === "root";
  
  // Get RTL options from uiSchema
  const uiOptions = uiSchema?.["ui:options"] || {};
  const isRTL = uiOptions.dir === "rtl" || true; // Default to RTL

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      mb={isRoot ? 0 : 6}
      mt={isRoot ? 0 : 4}
    >
      {/* Show title for nested objects (not root) */}
      {!isRoot && title && (
        <>
          <Heading
            as="h3"
            size="md"
            mb={4}
            fontFamily="Vazirmatn, sans-serif"
            textAlign={isRTL ? "right" : "left"}
            color="#1890ff"
            fontWeight="bold"
          >
            {title}
            {required && <span style={{ color: "red", marginRight: "4px" }}>*</span>}
          </Heading>
          <Divider mb={4} />
        </>
      )}
      
      {/* Show description if available */}
      {description && (
        <Text
          fontSize="sm"
          color="gray.600"
          mb={4}
          fontFamily="Vazirmatn, sans-serif"
          textAlign={isRTL ? "right" : "left"}
        >
          {description}
        </Text>
      )}

      {/* Render properties */}
      <Box>
        {properties.map((prop) => prop.content)}
      </Box>
    </Box>
  );
};

// Form is now imported directly from @rjsf/chakra-ui

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
    direction: 'rtl' as const,
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
    direction: 'rtl' as const,
  },
  title: {
    fontSize: '20px', // Smaller on mobile
    fontWeight: 'bold',
    color: '#1890ff',
    textAlign: 'right' as const,
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
  fieldWrapper: {
    marginBottom: '12px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px', // Reduced gap for faster checking
    direction: 'rtl' as const,
    alignItems: 'flex-start' as const,
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
          title: field.title, // ✅ Keep title in schema so widget can use it
          default: field.defaultValue || false,
        };
        uiSchema[field.id] = {
          "ui:widget": "checkbox",
          "ui:options": { 
            label: false, // ✅ Disable FieldTemplate label (widget will show its own)
          },
        };
        break;

      case "multipleChoice":
        properties[field.id] = {
          type: "array",
          title: field.title, // ✅ Keep title in schema so widget can use it if needed
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
            label: false, // ✅ Disable FieldTemplate label (widget will handle it)
            inline: false,
            enumOptions: field.options?.map((opt) => ({
              // Use Persian labels for individual checkboxes
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
          newErrors[field.id] = "این فیلد الزامی است";
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
          <div key={field.id} style={styles.fieldWrapper}>
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
  mode = "template",
  templateId,
  submissionId,
  patientId,
  submitUrl,
  patientContext,
  onSubmitData,
  className,
  style,
  formData,
  onSubmit,
  onChange,
}) => {
  // Dynamic base URL - use environment variable or fallback to current origin
  const getBaseUrl = () => {
    const raw = process.env.NEXT_PUBLIC_API_BASE || (typeof window !== 'undefined' ? window.location.origin : '');
    return raw.replace(/\/+$/, ''); // 🔥 حذف اسلش‌های انتهایی برای جلوگیری از /template/?
  };

  // Get authentication token from localStorage
  const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem('inlab_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        return user?.access || null;
      }
    } catch (e) {
      console.warn('Failed to get auth token from localStorage:', e);
    }
    return null;
  };

  // Get headers with authentication for GET requests
  const getAuthHeaders = (): HeadersInit => {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'accept': '*/*',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // Get headers with authentication for POST requests
  const getAuthHeadersForPost = (): HeadersInit => {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'accept': '*/*',
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const [schema, setSchema] = useState<any>(null);
  const [uiSchema, setUiSchema] = useState<any>({});
  const [formName, setFormName] = useState<string | null>(null);
  const [templateInfo, setTemplateInfo] = useState<{ id: number | null; name: string | null }>({ id: null, name: null });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rjsfFormData, setRjsfFormData] = useState<any>({});

  // If formData is provided, use direct JSON rendering mode
  useEffect(() => {
    if (formData) {
      // Convert simple JSON format to JSON Schema
      const { schema: convertedSchema, uiSchema: convertedUiSchema } = convertToJsonSchema(formData);
      setSchema(convertedSchema);
      setUiSchema(convertedUiSchema);
      return;
    }

    // Handle mode-based fetching
    if (mode === "filled_form") {
      // Filled form mode: fetch submission data
      if (!templateId) {
        setError("templateId is required when mode is 'filled_form'");
        return;
      }

      const fetchSubmission = async () => {
        setLoading(true);
        setError(null);
        try {
          console.log(`🚀 Starting fetchSubmission with:`, {
            mode,
            templateId,
            submissionId,
            patientId
          });
          
          // Fetch submission data first
          let submissionData: any = null;
          
          // Try different endpoint patterns
          const endpoints = [];
          
          const baseUrl = getBaseUrl();
          
          // Correct endpoint: /api/v3/remote_his_manual/form/submission (singular "form")
          if (submissionId) {
            // Primary endpoint - correct path with submission_id parameter
            const url1 = new URL(`${baseUrl}/api/v3/remote_his_manual/form/submission`);
            url1.searchParams.set("submission_id", submissionId);
            if (patientId) {
              url1.searchParams.set("patient_id", patientId);
            }
            endpoints.push(url1.toString());
            
            // Try path parameter variant
            endpoints.push(`${baseUrl}/api/v3/remote_his_manual/form/submission/${submissionId}`);
            
            // Try with patient_id only if provided
            if (patientId) {
              const url2 = new URL(`${baseUrl}/api/v3/remote_his_manual/form/submission`);
              url2.searchParams.set("submission_id", submissionId);
              url2.searchParams.set("patient_id", patientId);
              endpoints.push(url2.toString());
            }
          }
          
          // Try fetching by template_id and patient_id if no submissionId
          if (!submissionId && templateId && patientId) {
            const url3 = new URL(`${baseUrl}/api/v3/remote_his_manual/form/submission`);
            url3.searchParams.set("template_id", templateId);
            url3.searchParams.set("patient_id", patientId);
            endpoints.push(url3.toString());
          }
          
          console.log(`📋 Will try ${endpoints.length} endpoints:`, endpoints);
          
          if (endpoints.length === 0) {
            console.warn(`⚠️ No endpoints to try! submissionId=${submissionId}, templateId=${templateId}, patientId=${patientId}`);
          }
          
          let lastError: any = null;
          const authHeaders = getAuthHeaders();
          for (const endpoint of endpoints) {
            try {
              console.log(`🔍 Trying endpoint: ${endpoint}`);
              const res = await fetch(endpoint, {
                method: 'GET',
                headers: authHeaders,
              });
              if (res.ok) {
                const response = await res.json();
                console.log(`✅ Response from ${endpoint}:`, JSON.stringify(response, null, 2));
                // Handle both wrapped and direct response formats
                submissionData = response?.data || response;
                console.log(`📦 Extracted submissionData:`, JSON.stringify(submissionData, null, 2));
                break; // Success, exit loop
              } else {
                console.log(`❌ Endpoint ${endpoint} returned HTTP ${res.status}`);
                lastError = new Error(`HTTP ${res.status}`);
              }
            } catch (fetchErr: any) {
              console.log(`❌ Error fetching from ${endpoint}:`, fetchErr.message);
              lastError = fetchErr;
              continue; // Try next endpoint
            }
          }
          
          // Extract data from submission response if found
          // Response structure: { id, patient_data: { data: {...}, national_code }, form_data: { template_id, template_name, ... } }
          let loadedFormData: any = {};
          let templateIdFromSubmission: string | null = null;
          let loadedName: string | null = null;
          
          if (submissionData) {
            console.log(`🔍 Extracting from submissionData:`, {
              hasPatientData: !!submissionData.patient_data,
              hasPatientDataData: !!submissionData.patient_data?.data,
              patientDataKeys: submissionData.patient_data ? Object.keys(submissionData.patient_data) : [],
              fullPatientData: submissionData.patient_data,
            });
            
            loadedFormData = submissionData?.patient_data?.data || {};
            templateIdFromSubmission = submissionData?.form_data?.template_id?.toString() || submissionData?.form_data?.templateId?.toString() || null;
            loadedName = submissionData?.form_data?.template_name || submissionData?.form_data?.templateName || null;
            
            console.log(`📋 Extracted loadedFormData:`, JSON.stringify(loadedFormData, null, 2));
            console.log(`📋 Extracted templateIdFromSubmission:`, templateIdFromSubmission);
            console.log(`📋 Extracted loadedName:`, loadedName);
          } else {
            console.warn(`⚠️ No submissionData found after trying all endpoints`);
          }
          
          // Use templateId from prop, submission, or throw error
          const finalTemplateId = templateId || templateIdFromSubmission;

          if (!finalTemplateId) {
            throw new Error("Could not determine template_id. Please provide templateId prop or ensure submission includes form_data.template_id.");
          }

          // Fetch template schema using template_id from submission or prop
          let loadedSchema: any = null;
          let loadedUiSchema: any = {};
          let loadedTemplateId: number | null = null;

          try {
            const baseUrl = getBaseUrl();
            const authHeaders = getAuthHeaders();
            
            // Use query parameter format: /template?template_id=1
            const url = new URL(`${baseUrl}/api/v3/remote_his_manual/template`);
            url.searchParams.set("template_id", finalTemplateId);
            const templateUrl = url.toString();
            
            console.log(`🔍 Fetching template from: ${templateUrl}`);
            
            const templateRes = await fetch(templateUrl, {
              method: 'GET',
              headers: authHeaders,
            });
            
            if (!templateRes.ok) {
              throw new Error(`HTTP ${templateRes.status}: خطا در واکشی قالب`);
            }
            
            const templateData = await templateRes.json();
            
            const template = templateData?.data || templateData;
            loadedSchema = template?.schema;
            loadedUiSchema = template?.ui_schema || template?.uiSchema || {};
            loadedTemplateId = template?.id ? parseInt(template.id) : parseInt(finalTemplateId);
            
            // Use template name if not found in submission
            if (!loadedName && template?.name) {
              loadedName = template.name;
            }
          } catch (templateErr: any) {
            throw new Error(`خطا در واکشی قالب: ${templateErr.message}`);
          }

          if (!loadedSchema) {
            throw new Error("Could not load schema from template.");
          }

          console.log("✅ Loaded submission form data", JSON.stringify(loadedFormData, null, 2));
          console.log("✅ Loaded template schema", loadedSchema);
          console.log("✅ Loaded template uiSchema", loadedUiSchema);
          console.log("✅ Loaded form name", loadedName);
          console.log("✅ Loaded template ID", loadedTemplateId);
          console.log("📋 Form will render with pre-filled data:", Object.keys(loadedFormData).length > 0 ? "YES" : "NO (empty form)");

          setSchema(loadedSchema || {});
          setUiSchema(loadedUiSchema);
          // Set form data - this will populate all fields with the submission values
          setRjsfFormData(loadedFormData);
          setFormName(loadedName || null);
          setTemplateInfo({ id: loadedTemplateId, name: loadedName || null });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSubmission();
      return;
    }

    // Template mode: fetch template schema
    if (mode === "template") {
      if (!templateId) {
        setError("templateId is required when mode is 'template'");
        return;
      }

      const fetchTemplateSchema = async () => {
        setLoading(true);
        setError(null);
        try {
          if (!templateId) {
            throw new Error("templateId is required");
          }
          
          const baseUrl = getBaseUrl();
          const authHeaders = getAuthHeaders();
          
          // Use query parameter format: /template?template_id=1
          const url = new URL(`${baseUrl}/api/v3/remote_his_manual/template`);
          url.searchParams.set("template_id", templateId);
          const templateUrl = url.toString();
          
          console.log(`🔍 Fetching template from: ${templateUrl}`);
          
          const res = await fetch(templateUrl, {
            method: 'GET',
            headers: authHeaders,
          });
          
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: خطا در واکشی قالب`);
          }
          
          const templateData = await res.json();

          // Handle both response formats:
          // 1. Wrapped: { status_code: 200, data: { schema, ui_schema, ... } }
          // 2. Direct: { schema, ui_schema, ... }
          const template = templateData?.data || templateData;
          const loadedSchema = template?.schema;
          const loadedUiSchema = template?.ui_schema || template?.uiSchema || {};
          const loadedName = template?.name || loadedSchema?.title;
          const loadedTemplateId = template?.id ? parseInt(template.id) : (templateId ? parseInt(templateId) : null);

          console.log("✅ Loaded schema", loadedSchema);
          console.log("✅ Loaded uiSchema", loadedUiSchema);
          console.log("✅ Loaded form name", loadedName);
          console.log("✅ Loaded template ID", loadedTemplateId);

          setSchema(loadedSchema || {});
          setUiSchema(loadedUiSchema);
          setFormName(loadedName || null);
          setTemplateInfo({ id: loadedTemplateId, name: loadedName || null });
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTemplateSchema();
      return;
    }
  }, [mode, templateId, submissionId, patientId, formData]);

  // Process schema to conditionally show/hide fields based on dependencies
  const processConditionalSchema = (baseSchema: any, currentFormData: any, originalUiSchema: any): { schema: any; uiSchema: any } => {
    if (!baseSchema) {
      return { schema: baseSchema, uiSchema: originalUiSchema };
    }
    
    // Always remove title to hide it from the form
    const processedSchema = JSON.parse(JSON.stringify(baseSchema));
    delete processedSchema.title;
    
    // Deep clone uiSchema to avoid mutations
    const processedUiSchema = originalUiSchema ? JSON.parse(JSON.stringify(originalUiSchema)) : {};
    
    // Ensure root-level RTL options are preserved
    if (!processedUiSchema['ui:options']) {
      processedUiSchema['ui:options'] = { dir: 'rtl', textAlign: 'right' };
    } else {
      processedUiSchema['ui:options'] = {
        ...processedUiSchema['ui:options'],
        dir: 'rtl',
        textAlign: 'right'
      };
    }
    
    if (!baseSchema.dependencies) {
      // Ensure all fields have RTL options even without dependencies
      Object.keys(baseSchema.properties || {}).forEach((fieldName) => {
        if (!processedUiSchema[fieldName]) {
          processedUiSchema[fieldName] = {};
        }
        if (!processedUiSchema[fieldName]['ui:options']) {
          processedUiSchema[fieldName]['ui:options'] = { dir: 'rtl', textAlign: 'right' };
        } else {
          processedUiSchema[fieldName]['ui:options'] = {
            ...processedUiSchema[fieldName]['ui:options'],
            dir: 'rtl',
            textAlign: 'right'
          };
        }
        // For checkbox (boolean) fields, ensure title is preserved in schema
        // The widget will use schema.title directly, so we keep it in the schema
        if (baseSchema.properties[fieldName]?.type === 'boolean') {
          // Keep the schema title - don't clear it
          // The FieldTemplate will hide the label for checkboxes, and the widget will use schema.title
          if (processedSchema.properties[fieldName] && baseSchema.properties[fieldName]?.title) {
            processedSchema.properties[fieldName].title = baseSchema.properties[fieldName].title;
          }
        }
        
        // For nested object fields, preserve the title so ObjectFieldTemplate can display it
        if (baseSchema.properties[fieldName]?.type === 'object') {
          if (processedSchema.properties[fieldName] && baseSchema.properties[fieldName]?.title) {
            processedSchema.properties[fieldName].title = baseSchema.properties[fieldName].title;
          }
        }
      });
      return { schema: processedSchema, uiSchema: processedUiSchema };
    }

    // Build dependency map from schema dependencies
    // For dependencies with oneOf, extract the condition field and dependent fields
    const dependencyMap: Record<string, string> = {};
    
    Object.keys(baseSchema.dependencies || {}).forEach((conditionField) => {
      const dependency = baseSchema.dependencies[conditionField];
      if (dependency.oneOf) {
        // Find the oneOf entry that has properties (the true case)
        const trueCase = dependency.oneOf.find((item: any) => 
          item.properties && Object.keys(item.properties).length > 1
        );
        if (trueCase && trueCase.properties) {
          // Get all properties except the condition field itself
          Object.keys(trueCase.properties).forEach((prop) => {
            if (prop !== conditionField) {
              dependencyMap[prop] = conditionField;
            }
          });
        }
      }
    });

    // Get original field order from base schema
    const originalFieldOrder = Object.keys(baseSchema.properties || {});
    
    // Build ordered properties: insert dependent fields right after their parent
    const orderedProperties: Record<string, any> = {};
    const processedUiSchemaOrdered: Record<string, any> = { ...processedUiSchema };
    const addedFields = new Set<string>();

    // First, identify all dependent fields (year fields) to exclude them from initial rendering
    const allDependentFields = new Set(Object.keys(dependencyMap));

    // Build ordered properties with dependent fields right after their parents
    originalFieldOrder.forEach((fieldName) => {
      // Skip if already added
      if (addedFields.has(fieldName)) {
        return;
      }

      // Skip dependent fields (year fields) - they will be added conditionally after their parent
      if (allDependentFields.has(fieldName)) {
        return;
      }

      // This is a regular field or condition field (checkbox) - add it ONCE
      orderedProperties[fieldName] = { ...baseSchema.properties[fieldName] };
      
      // Ensure RTL options are set for this field
      if (!processedUiSchemaOrdered[fieldName]) {
        processedUiSchemaOrdered[fieldName] = {};
      }
      if (!processedUiSchemaOrdered[fieldName]['ui:options']) {
        processedUiSchemaOrdered[fieldName]['ui:options'] = { dir: 'rtl', textAlign: 'right' };
      } else {
        processedUiSchemaOrdered[fieldName]['ui:options'] = {
          ...processedUiSchemaOrdered[fieldName]['ui:options'],
          dir: 'rtl',
          textAlign: 'right'
        };
      }
      
      // For checkbox (boolean) fields, ensure title is preserved in schema
      // The widget will use schema.title directly, so we keep it in the schema
      if (baseSchema.properties[fieldName]?.type === 'boolean') {
        // Keep the schema title - don't clear it
        // The FieldTemplate will hide the label for checkboxes, and the widget will use schema.title
        const originalField = baseSchema.properties[fieldName];
        if (originalField?.title) {
          orderedProperties[fieldName].title = originalField.title;
        }
      }
      
      // For nested object fields, preserve the title so ObjectFieldTemplate can display it
      if (baseSchema.properties[fieldName]?.type === 'object') {
        const originalField = baseSchema.properties[fieldName];
        if (originalField?.title) {
          orderedProperties[fieldName].title = originalField.title;
        }
      }
      
      addedFields.add(fieldName);

      // Check if this field has a dependent field (year field) that should be shown
      const dependentField = Object.keys(dependencyMap).find(
        (dep) => dependencyMap[dep] === fieldName
      );
      
      if (dependentField && !addedFields.has(dependentField)) {
        const conditionValue = currentFormData[fieldName];
        if (conditionValue === true) {
          // Condition is met, add dependent field (year field) right after parent
          orderedProperties[dependentField] = baseSchema.properties[dependentField];
          
          // Ensure RTL options are set for dependent field
          if (!processedUiSchemaOrdered[dependentField]) {
            processedUiSchemaOrdered[dependentField] = {};
          }
          processedUiSchemaOrdered[dependentField] = { 
            ...(originalUiSchema && originalUiSchema[dependentField] ? originalUiSchema[dependentField] : {}),
            'ui:widget': (originalUiSchema && originalUiSchema[dependentField] && originalUiSchema[dependentField]['ui:widget']) 
              ? originalUiSchema[dependentField]['ui:widget'] 
              : 'text',
            'ui:options': {
              ...(originalUiSchema && originalUiSchema[dependentField] && originalUiSchema[dependentField]['ui:options'] 
                ? originalUiSchema[dependentField]['ui:options'] 
                : {}),
              dir: 'rtl',
              textAlign: 'right'
            }
          };
          addedFields.add(dependentField);
        }
      }
    });

    // Remove dependencies from schema to prevent RJSF from rendering duplicate fields
    processedSchema.properties = orderedProperties;
    delete processedSchema.dependencies;
    // Remove title to hide it from the form
    delete processedSchema.title;
    
    return { schema: processedSchema, uiSchema: processedUiSchemaOrdered };
  };

  const handleSubmit = async ({ formData: submittedData }: any) => {
    // If using direct formData prop with custom onSubmit
    if (formData && onSubmit) {
      onSubmit(submittedData);
      return;
    }

    // For template mode, require templateId
    if (mode === "template") {
      if (!templateId) {
        console.error("templateId is required for template mode");
        return;
      }
    }

    // For filled_form mode, require submissionId
    if (mode === "filled_form") {
      if (!submissionId) {
        console.error("submissionId is required for filled_form mode");
        return;
      }
    }

    try {
      // Extract national_code from patientContext
      const nationalCode = patientContext?.national_code || patientContext?.nationalCode || "";
      
      // Get user_id from patientContext and ensure it's a string
      const userIdRaw = patientContext?.user_id || patientContext?.userId || "";
      const userId = userIdRaw ? String(userIdRaw) : "";
      
      // Generate current timestamp in ISO format
      const createdAt = new Date().toISOString();
      
      // Get template_id - ensure it's a number
      const templateIdNum = templateInfo.id || (templateId ? parseInt(templateId) : null);
      if (!templateIdNum) {
        throw new Error("template_id is required for submission");
      }
      
      // Build payload according to the required schema
      const payload = {
        patient_data: {
          national_code: nationalCode,
          data: submittedData || {}, // The actual form field values, ensure it's an object
        },
        form_data: {
          user_id: userId,
          created_at: createdAt,
          template_id: templateIdNum,
          template_name: templateInfo.name || formName || "",
        },
      };

      console.log("📤 Submitting payload:", payload);

      const httpMethod = mode === "template" ? "POST" : "PUT";
      
      // Automatically construct the URL based on mode and available props
      let finalSubmitUrl: string;
      
      if (submitUrl) {
        // If submitUrl is provided, use it as base and append submission_id for PUT if needed
        if (httpMethod === "PUT" && submissionId) {
          // Check if URL already has submission_id parameter
          if (!submitUrl.includes(`submission_id=`) && !submitUrl.includes(`/${submissionId}`)) {
            const urlObj = new URL(submitUrl, getBaseUrl());
            urlObj.searchParams.set("submission_id", submissionId);
            finalSubmitUrl = urlObj.toString();
          } else {
            finalSubmitUrl = submitUrl;
          }
        } else {
          finalSubmitUrl = submitUrl;
        }
      } else {
        // Auto-construct URL from base URL
        const baseUrl = getBaseUrl();
        if (httpMethod === "POST") {
          // POST: /api/v3/remote_his_manual/forms/submission
          finalSubmitUrl = `${baseUrl}/api/v3/remote_his_manual/forms/submission`;
        } else {
          // PUT: /api/v3/remote_his_manual/forms/submission?submission_id={id}
          const urlObj = new URL(`${baseUrl}/api/v3/remote_his_manual/forms/submission`);
          urlObj.searchParams.set("submission_id", submissionId!);
          finalSubmitUrl = urlObj.toString();
        }
      }
      
      console.log(`📤 Using ${httpMethod} method to: ${finalSubmitUrl}`);

      const response = await fetch(finalSubmitUrl, {
        method: httpMethod,
        headers: getAuthHeadersForPost(),
        body: JSON.stringify(payload),
      });

      // Read response body once (can only be read once)
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`خطا در ارسال: ${response.status} - ${responseText}`);
      }

      // Try to parse JSON response, but handle cases where backend returns non-serializable objects
      let result;
      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        // If JSON parsing fails, the backend likely returned a non-serializable object
        console.error("⚠️ Backend returned non-JSON response. This usually means the backend needs to serialize the response object.");
        console.error("Parse error:", parseError);
        // Still treat as success if status was OK, but log the issue
        result = { success: true, message: "Form submitted successfully (backend serialization issue detected)" };
      }
      
      // For PUT requests, check if different user was detected
      if (httpMethod === "PUT") {
        const message = result?.message || "";
        if (message.toLowerCase().includes("different user") || 
            message.toLowerCase().includes("different user detected")) {
          const errorMessage = "خطا: فقط کاربری که این فرم را ایجاد کرده است می‌تواند آن را ویرایش کند.";
          showMessage(errorMessage, "error");
          console.error("Different user detected: Only the user who created this submission can edit it.");
          return; // Exit early, don't show success message
        }
      }
      
      showMessage("فرم با موفقیت ارسال شد!", "success");
      onSubmitData?.(result);
    } catch (err: any) {
      console.error("Submit error:", err);
      // Only show error message if it's not already shown (check if it's the user mismatch error)
      if (!err.message?.includes("Different user detected")) {
        showMessage(`خطا در ارسال فرم: ${err.message}`, "error");
      }
    }
  };

  // If using direct formData with custom renderer (simpler, no RJSF dependency)
  if (formData && !templateId) {
    return (
      <div className={className} style={style}>
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Title hidden for quick checkbox selection */}
            {/* {formData.title && <div style={styles.title}>{formData.title}</div>} */}
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
          {mode === "template" 
            ? "لطفاً templateId معتبری وارد کنید یا formData را وارد کنید"
            : mode === "filled_form"
            ? "لطفاً submissionId معتبری وارد کنید یا formData را وارد کنید"
            : "لطفاً templateId یا submissionId معتبری وارد کنید یا formData را وارد کنید"}
        </div>
      </div>
    );

  return (
    <ChakraProvider theme={theme}>
      <div className={className} style={style}>
        <style>{`
[data-form-container] .field {
          margin-bottom: 12px;
        }
        [data-form-container] .form-group {
          margin-bottom: 12px;
        }
        [data-form-container] > div > div:not(:last-child) {
          margin-bottom: 12px;
        }
        /* Hide only root RJSF form title, not nested object titles */
        [data-form-container] .rjsf > form > legend,
        [data-form-container] .rjsf > form > h1,
        [data-form-container] .rjsf > form > h2 {
          display: none !important;
        }
        /* Ensure RTL and Vazirmatn font */
        [data-form-container] {
          direction: rtl;
          text-align: right;
          font-family: Vazirmatn, sans-serif !important;
        }
        [data-form-container] * {
          font-family: Vazirmatn, sans-serif !important;
        }
        [data-form-container] label {
          direction: rtl !important;
          unicode-bidi: plaintext !important;
        }
      `}</style>
        <div style={styles.container}>
          <div style={styles.card}>
            {/* Title hidden for quick checkbox selection */}
            {/* <div style={styles.title}>
              {formData?.title || formName || schema?.title || `فرم پویا (Template ${templateId})`}
            </div> */}
            {mode === "filled_form" && Object.keys(rjsfFormData).length > 0 && (
              <div style={{ 
                padding: "12px", 
                marginBottom: "16px", 
                backgroundColor: "#f6ffed", 
                border: "1px solid #b7eb8f", 
                borderRadius: "8px",
                fontSize: "14px",
                color: "#52c41a",
                fontFamily: "Vazirmatn, sans-serif",
                direction: "rtl",
                textAlign: "right"
              }}>
                ✓ فرم با داده‌های از پیش پر شده نمایش داده می‌شود ({Object.keys(rjsfFormData).length} فیلد)
              </div>
            )}
            {mode === "filled_form" && Object.keys(rjsfFormData).length === 0 && (
              <div style={{ 
                padding: "12px", 
                marginBottom: "16px", 
                backgroundColor: "#fff7e6", 
                border: "1px solid #ffd591", 
                borderRadius: "8px",
                fontSize: "14px",
                color: "#d46b08",
                fontFamily: "Vazirmatn, sans-serif",
                direction: "rtl",
                textAlign: "right"
              }}>
                ⚠ فرم خالی است - داده‌ای از submission یافت نشد
              </div>
            )}
            
            <div
              style={styles.formContainer}
              className="rjsf-form-container"
              data-form-container
            >
              <Form
                key={`form-${mode}-${templateInfo.id || templateId || 'unknown'}`}
                schema={processConditionalSchema(schema, rjsfFormData, uiSchema).schema}
                uiSchema={processConditionalSchema(schema, rjsfFormData, uiSchema).uiSchema}
                validator={validator}
                formData={rjsfFormData}
                widgets={{
                  toggle: ToggleWidget,
                  file: FileWidget,
                }}
                templates={{
                  ObjectFieldTemplate: CustomObjectFieldTemplate,
                }}
                onChange={({ formData: newFormData }) => {
                  setRjsfFormData(newFormData);
                }}
                onSubmit={handleSubmit}
                liveValidate
                transformErrors={(errors) => {
                  // Only show required field errors, hide all other errors
                  return errors
                    .filter((error) => error.name === "required")
                    .map((error) => ({
                      ...error,
                      message: "این فیلد الزامی است",
                    }));
                }}
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
      </div>
    </ChakraProvider>
  );
};

export const SimpleFormBuilderMeta: CodeComponentMeta<SimpleFormBuilderProps> = {
  name: "SimpleFormBuilder",
  displayName: "Simple Form Builder",
  description: "Dynamic form builder that accepts JSON data or templateId. Supports text, textarea, checkbox, and multiple choice fields. Supports two modes: 'template' (render empty template) and 'filled_form' (render filled form).",
  importPath: "@/components/SimpleFormBuilder",
  props: {
    mode: {
      type: "choice",
      displayName: "Mode",
      description: "Working mode: 'template' to load an empty template, 'filled_form' to load a filled submission",
      options: ["template", "filled_form"],
      defaultValue: "template",
    },
    templateId: {
      type: "string",
      displayName: "Template ID",
      description: "Required: Template ID to fetch schema from API (required for both 'template' and 'filled_form' modes)",
    },
    submissionId: {
      type: "string",
      displayName: "Submission ID",
      description: "Optional when mode is 'filled_form': Submission ID to fetch specific filled form data. If not provided, will try to fetch by template_id and patient_id",
    },
    patientId: {
      type: "string",
      displayName: "Patient ID",
      description: "Optional: Patient ID to filter submission data (used with mode='filled_form')",
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