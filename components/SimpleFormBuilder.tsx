"use client";
import React, { useEffect, useState, useMemo } from "react";
import { ChakraProvider, extendTheme, Switch, FormControl, FormLabel, Box, Input, Image, Text, Button, Heading, Divider } from "@chakra-ui/react";
import validator from "@rjsf/validator-ajv8";
import { CodeComponentMeta } from "@plasmicapp/host";
import { WidgetProps, ObjectFieldTemplateProps } from "@rjsf/utils";
// Chakra UI Theme - Good RTL support
import Form from "@rjsf/chakra-ui";
import { getBaseUrl } from "@/utils/getBaseUrl";

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
  // For array types, format is on items, not schema itself
  const itemsFormat = schema?.items && typeof schema.items === "object" && !Array.isArray(schema.items) 
    ? (schema.items as any)?.format 
    : "";
  const format = schema?.format || itemsFormat || "";

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);

  // Check if multiple files are allowed from ui:options
  useEffect(() => {
    const allowMultiple = uiOptions.multiple === true || uiOptions.multiple === "true";
    setIsMultiple(allowMultiple);
  }, [uiOptions]);

  // Load existing value if it's a data URL or media object or array
  useEffect(() => {
    if (value) {
      // Handle array of files (multiple images)
      if (Array.isArray(value)) {
        const dataUrls: string[] = [];
        const names: string[] = [];
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            const dataUrl = item.dataUrl || item.value || "";
            const filename = item.filename || item.original_filename || "";
            if (dataUrl && dataUrl.startsWith("data:")) {
              dataUrls.push(dataUrl);
              names.push(filename || "فایل بارگذاری شده");
            }
          } else if (typeof item === "string" && item.startsWith("data:")) {
            dataUrls.push(item);
            const match = item.match(/filename=([^;]+)/);
            names.push(match ? match[1] : "فایل بارگذاری شده");
          }
        });
        setPreviews(dataUrls);
        setFileNames(names);
      } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Handle single object format: { dataUrl: "...", filename: "..." }
        const dataUrl = value.dataUrl || value.value || "";
        const filename = value.filename || value.original_filename || "";
        if (dataUrl && dataUrl.startsWith("data:")) {
          setPreviews([dataUrl]);
          setFileNames([filename || "فایل بارگذاری شده"]);
        } else {
          setPreviews([]);
          setFileNames([]);
        }
      } else if (typeof value === "string" && value.startsWith("data:")) {
        // Handle single string data URL
        setPreviews([value]);
        const match = value.match(/filename=([^;]+)/);
        setFileNames([match ? match[1] : "فایل بارگذاری شده"]);
      } else {
        setPreviews([]);
        setFileNames([]);
      }
    } else {
      setPreviews([]);
      setFileNames([]);
    }
  }, [value]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      onChange(undefined);
      setFileNames([]);
      setPreviews([]);
      return;
    }

    // Convert FileList to Array
    const fileArray = Array.from(files);

    // If format is data-url, convert to base64
    // Also check if this is an array field with data-url items
    const itemsFormat = schema?.items && typeof schema.items === "object" && !Array.isArray(schema.items) 
      ? (schema.items as any)?.format 
      : "";
    const isDataUrlFormat = format === "data-url" || itemsFormat === "data-url";
    if (isDataUrlFormat) {
      const filePromises = fileArray.map((file) => {
        return new Promise<{ dataUrl: string; filename: string; original_filename: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            resolve({
              dataUrl: dataUrl,
              filename: file.name,
              original_filename: file.name,
            });
          };
          reader.onerror = () => {
            reject(new Error(`Error reading file: ${file.name}`));
          };
          reader.readAsDataURL(file);
        });
      });

      try {
        const fileValues = await Promise.all(filePromises);
        
        // If multiple is enabled, store as array; otherwise store as single object (first file)
        if (isMultiple) {
          // Get existing files from value (if any)
          const existingFiles = Array.isArray(value) ? value : [];
          
          // Append new files to existing ones (avoid duplicates by filename)
          const existingFilenames = new Set(existingFiles.map((f: any) => 
            typeof f === "object" ? (f.filename || f.original_filename) : ""
          ));
          
          const newFilesToAdd = fileValues.filter((f) => 
            !existingFilenames.has(f.filename)
          );
          
          const allFiles = [...existingFiles, ...newFilesToAdd];
          
          onChange(allFiles);
          setFileNames(allFiles.map((f: any) => 
            typeof f === "object" ? (f.filename || f.original_filename || "فایل") : "فایل"
          ));
          setPreviews(allFiles.map((f: any) => 
            typeof f === "object" ? (f.dataUrl || f.value || "") : (typeof f === "string" ? f : "")
          ));
        } else {
          // Single file mode - use first file only
          const firstFile = fileValues[0];
          onChange(firstFile);
          setFileNames([firstFile.filename]);
          setPreviews([firstFile.dataUrl]);
        }
        onBlur(id, isMultiple ? fileValues : fileValues[0]);
      } catch (error) {
        onChange(undefined);
        setFileNames([]);
        setPreviews([]);
      }
    } else {
      // For other formats, just store the file name(s)
      if (isMultiple) {
        onChange(fileArray.map((f) => f.name));
        setFileNames(fileArray.map((f) => f.name));
      } else {
        onChange(fileArray[0].name);
        setFileNames([fileArray[0].name]);
      }
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setFileNames([]);
    setPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    if (isMultiple && Array.isArray(value)) {
      // Remove file from array
      const newValue = value.filter((_: any, i: number) => i !== index);
      
      if (newValue.length > 0) {
        onChange(newValue);
        setFileNames(newValue.map((f: any) => 
          typeof f === "object" ? (f.filename || f.original_filename || "فایل") : "فایل"
        ));
        setPreviews(newValue.map((f: any) => 
          typeof f === "object" ? (f.dataUrl || f.value || "") : (typeof f === "string" ? f : "")
        ));
      } else {
        onChange(undefined);
        setFileNames([]);
        setPreviews([]);
      }
    } else {
      // Single file mode - remove all
      handleRemove();
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
          multiple={isMultiple}
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
          {fileNames.length > 0 
            ? (isMultiple ? `افزودن فایل بیشتر (${fileNames.length} فایل)` : "تغییر فایل")
            : (isMultiple ? "انتخاب فایل‌ها" : "انتخاب فایل")}
        </Button>

        {fileNames.length > 0 && (
          <Box mb={2}>
            {fileNames.map((fileName, index) => (
              <Box key={index} mb={2} p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
                <Text fontSize="sm" color="gray.600" fontFamily="Vazirmatn, sans-serif" mb={1}>
                  {fileName}
                </Text>
                <Button
                  onClick={() => handleRemoveFile(index)}
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  fontFamily="Vazirmatn, sans-serif"
                >
                  حذف
                </Button>
              </Box>
            ))}
          </Box>
        )}

        {previews.length > 0 && (
          <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
            {previews.map((preview, index) => {
              const isImage = preview && preview.startsWith("data:image/");
              return isImage ? (
                <Box key={index}>
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    maxH="200px"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                  />
                </Box>
              ) : null;
            })}
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
      // Failed to get auth token
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
          // Fetch submission data first
          let submissionData: any = null;
          
          // Try different endpoint patterns
          const endpoints = [];
          
          const baseUrl = getBaseUrl();
          
          // Safety check: ensure baseUrl is valid and not frontend
          if (!baseUrl || baseUrl.includes("historio-frontend")) {
            throw new Error(`Invalid API base URL: ${baseUrl}. Must point to backend, not frontend.`);
          }
          
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
          
          let lastError: any = null;
          const authHeaders = getAuthHeaders();
          for (const endpoint of endpoints) {
            try {
              const res = await fetch(endpoint, {
                method: 'GET',
                headers: authHeaders,
              });
              if (res.ok) {
                const response = await res.json();
                // Handle both wrapped and direct response formats
                submissionData = response?.data || response;
                break; // Success, exit loop
              } else {
                lastError = new Error(`HTTP ${res.status}`);
              }
            } catch (fetchErr: any) {
              lastError = fetchErr;
              continue; // Try next endpoint
            }
          }
          
          // Extract data from submission response if found
          // Response structure: { id, patient_data: { data: {...}, national_code }, form_data: { template_id, template_name, ... }, media_properties: {...} }
          let loadedFormData: any = {};
          let templateIdFromSubmission: string | null = null;
          let loadedName: string | null = null;
          let mediaProperties: any = null;
          
          if (submissionData) {
            loadedFormData = submissionData?.patient_data?.data || {};
            templateIdFromSubmission = submissionData?.form_data?.template_id?.toString() || submissionData?.form_data?.templateId?.toString() || null;
            loadedName = submissionData?.form_data?.template_name || submissionData?.form_data?.templateName || null;
            mediaProperties = submissionData?.media_properties || null;
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
            
            // Safety check: ensure baseUrl is valid and not frontend
            if (!baseUrl || baseUrl.includes("historio-frontend")) {
              throw new Error(`Invalid API base URL: ${baseUrl}. Must point to backend, not frontend.`);
            }
            
            const templateUrl = new URL(`${baseUrl}/api/v3/remote_his_manual/template`);
            templateUrl.searchParams.set("template_id", finalTemplateId);
            const templateRes = await fetch(templateUrl.toString(), {
              method: 'GET',
              headers: getAuthHeaders(),
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

          // Set schema and UI schema first
          setSchema(loadedSchema || {});
          setUiSchema(loadedUiSchema);
          setFormName(loadedName || null);
          setTemplateInfo({ id: loadedTemplateId, name: loadedName || null });

          // Restore media from media_properties if available
          if (mediaProperties && mediaProperties.file_path && loadedSchema) {
            try {
              const baseUrl = getBaseUrl();
              // Construct full URL for media file
              let mediaUrl: string;
              if (mediaProperties.file_path.startsWith("http://") || mediaProperties.file_path.startsWith("https://")) {
                mediaUrl = mediaProperties.file_path;
              } else if (mediaProperties.file_path.startsWith("/")) {
                // Relative path - resolve against base URL
                mediaUrl = `${baseUrl}${mediaProperties.file_path}`;
              } else {
                // Relative path without leading slash
                mediaUrl = `${baseUrl}/${mediaProperties.file_path}`;
              }
              
              // Fetch media file and convert to data URL
              const mediaResponse = await fetch(mediaUrl, {
                method: 'GET',
                headers: getAuthHeaders(),
              });
              
              if (mediaResponse.ok) {
                const blob = await mediaResponse.blob();
                const reader = new FileReader();
                reader.onload = (e) => {
                  const dataUrl = e.target?.result as string;
                  const originalFilename = mediaProperties.original_filename || mediaProperties.filename || "file";
                  
                  // Find the first file field in the schema and populate it
                  const findFirstFileField = (properties: any, data: any, path: string = ""): boolean => {
                    if (!properties) return false;
                    
                    for (const key of Object.keys(properties)) {
                      const fieldSchema = properties[key];
                      const fieldPath = path ? `${path}.${key}` : key;
                      
                      // Check if this is a file field (single or array)
                      const isFileField = (fieldSchema?.format === "data-url") || 
                                         (fieldSchema?.type === "string" && fieldSchema?.format === "data-url") ||
                                         (fieldSchema?.type === "array" && fieldSchema?.items?.format === "data-url");
                      if (isFileField) {
                        // Determine if this is an array field
                        const isArrayField = fieldSchema?.type === "array";
                        // Create the media object
                        const mediaObject = {
                          dataUrl: dataUrl,
                          filename: originalFilename,
                          original_filename: originalFilename,
                        };
                        // Populate this field with media data
                        if (path) {
                          // Nested field
                          const pathParts = path.split(".");
                          let current = data;
                          for (let i = 0; i < pathParts.length - 1; i++) {
                            if (!current[pathParts[i]]) {
                              current[pathParts[i]] = {};
                            }
                            current = current[pathParts[i]];
                          }
                          // Set as array if field is array type, otherwise single object
                          current[key] = isArrayField ? [mediaObject] : mediaObject;
                        } else {
                          // Root level field
                          // Set as array if field is array type, otherwise single object
                          data[key] = isArrayField ? [mediaObject] : mediaObject;
                        }
                        return true;
                      } else if (fieldSchema?.type === "object" && fieldSchema?.properties) {
                        // Recursively search nested objects
                        if (!data[key]) {
                          data[key] = {};
                        }
                        if (findFirstFileField(fieldSchema.properties, data[key], fieldPath)) {
                          return true;
                        }
                      }
                    }
                    return false;
                  };
                  
                  const formDataWithMedia = { ...loadedFormData };
                  findFirstFileField(loadedSchema.properties || {}, formDataWithMedia);
                  
                  setRjsfFormData(formDataWithMedia);
                };
                reader.onerror = () => {
                  setRjsfFormData(loadedFormData);
                };
                reader.readAsDataURL(blob);
              } else {
                setRjsfFormData(loadedFormData);
              }
            } catch (mediaErr: any) {
              setRjsfFormData(loadedFormData);
            }
          } else {
            // No media to restore, set form data as is
            setRjsfFormData(loadedFormData);
          }
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
          const baseUrl = getBaseUrl();
          
          // Safety check: ensure baseUrl is valid and not frontend
          if (!baseUrl || baseUrl.includes("historio-frontend")) {
            throw new Error(`Invalid API base URL: ${baseUrl}. Must point to backend, not frontend.`);
          }
          
          const url = new URL(`${baseUrl}/api/v3/remote_his_manual/template`);
          if (templateId) {
            url.searchParams.set("template_id", templateId);
          }
          const res = await fetch(url.toString(), {
            method: 'GET',
            headers: getAuthHeaders(),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();

          // Handle both response formats:
          // 1. Wrapped: { status_code: 200, data: { schema, ui_schema, ... } }
          // 2. Direct: { schema, ui_schema, ... }
          const templateData = data?.data || data;
          const loadedSchema = templateData?.schema;
          const loadedUiSchema = templateData?.ui_schema || templateData?.uiSchema || {};
          const loadedName = templateData?.name || loadedSchema?.title;
          const loadedTemplateId = templateData?.id ? parseInt(templateData.id) : (templateId ? parseInt(templateId) : null);

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
  const processConditionalSchema = (
    baseSchema: any,
    currentFormData: any,
    originalUiSchema: any
  ): { schema: any; uiSchema: any } => {
    if (!baseSchema) {
      return { schema: baseSchema, uiSchema: originalUiSchema };
    }

    // Always remove title to hide it from the form
    const processedSchema = JSON.parse(JSON.stringify(baseSchema));
    delete processedSchema.title;

    // Deep clone uiSchema to avoid mutations
    const processedUiSchema = originalUiSchema
      ? JSON.parse(JSON.stringify(originalUiSchema))
      : {};

    // Ensure root-level RTL options are preserved
    if (!processedUiSchema["ui:options"]) {
      processedUiSchema["ui:options"] = { dir: "rtl", textAlign: "right" };
    } else {
      processedUiSchema["ui:options"] = {
        ...processedUiSchema["ui:options"],
        dir: "rtl",
        textAlign: "right",
      };
    }

    if (!baseSchema.dependencies) {
      // Ensure all fields have RTL options even without dependencies,
      // and recursively process nested object fields that may have their own dependencies.
      Object.keys(baseSchema.properties || {}).forEach((fieldName) => {
        const fieldSchema = baseSchema.properties[fieldName];
        const fieldFormData = currentFormData ? currentFormData[fieldName] : undefined;
        const originalFieldUiSchema =
          originalUiSchema && originalUiSchema[fieldName]
            ? originalUiSchema[fieldName]
            : {};

        // If this field is an object, recursively process its schema so nested dependencies work
        if (fieldSchema?.type === "object") {
          const { schema: childSchema, uiSchema: childUiSchema } =
            processConditionalSchema(
              fieldSchema,
              fieldFormData || {},
              originalFieldUiSchema
            );

          processedSchema.properties[fieldName] = childSchema;

          // Merge container-level uiSchema (like ui:order) with the processed child uiSchema
          processedUiSchema[fieldName] = {
            ...originalFieldUiSchema,
            ...childUiSchema,
          };

          // Preserve the title for object fields so ObjectFieldTemplate can display it
          if (fieldSchema.title) {
            processedSchema.properties[fieldName].title = fieldSchema.title;
          }
        } else {
          // Non-object fields: just ensure RTL ui:options and preserve titles for booleans
          if (!processedUiSchema[fieldName]) {
            processedUiSchema[fieldName] = {};
          }
          if (!processedUiSchema[fieldName]["ui:options"]) {
            processedUiSchema[fieldName]["ui:options"] = {
              dir: "rtl",
              textAlign: "right",
            };
          } else {
            processedUiSchema[fieldName]["ui:options"] = {
              ...processedUiSchema[fieldName]["ui:options"],
              dir: "rtl",
              textAlign: "right",
            };
          }

          // For checkbox (boolean) fields, ensure title is preserved in schema
          if (fieldSchema?.type === "boolean") {
            if (
              processedSchema.properties[fieldName] &&
              fieldSchema.title
            ) {
              processedSchema.properties[fieldName].title = fieldSchema.title;
            }
          }
        }
      });
      return { schema: processedSchema, uiSchema: processedUiSchema };
    }

    // Helper to build an evaluator for when a dependent field should be shown
    const buildConditionEvaluator = (conditionSchema: any) => {
      // Handle array with contains.anyOf pattern
      if (
        conditionSchema?.type === "array" &&
        conditionSchema?.contains?.anyOf
      ) {
        const anyOfArray = conditionSchema.contains.anyOf;
        const targets = anyOfArray
          .map((item: any) => item?.const)
          .filter((val: any) => val !== undefined);
        return (value: any) => {
          if (!Array.isArray(value)) return false;
          return targets.some((target: any) => value.includes(target));
        };
      }
      // Handle array with contains.const pattern
      if (
        conditionSchema?.type === "array" &&
        conditionSchema?.contains?.const !== undefined
      ) {
        const target = conditionSchema.contains.const;
        return (value: any) => Array.isArray(value) && value.includes(target);
      }
      if (conditionSchema?.type === "boolean") {
        return (value: any) => value === true;
      }
      if (conditionSchema?.const !== undefined) {
        const target = conditionSchema.const;
        return (value: any) => value === target;
      }
      if (
        Array.isArray(conditionSchema?.enum) &&
        conditionSchema.enum.length > 0
      ) {
        const allowed = conditionSchema.enum;
        return (value: any) => allowed.includes(value);
      }
      // Fallback: consider any truthy value as satisfying the condition
      return (value: any) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return Boolean(value);
      };
    };

    type DependencyEntry = {
      parentField: string;
      dependentField: string;
      shouldDisplay: (parentValue: any) => boolean;
    };
    const dependencyEntries: DependencyEntry[] = [];

    // Process dependencies pattern
    Object.keys(baseSchema.dependencies || {}).forEach((conditionField) => {
      const dependency = baseSchema.dependencies[conditionField];
      if (dependency.oneOf) {
        // Process all oneOf cases to register dependency relationships up-front
        dependency.oneOf.forEach((item: any) => {
          if (item.properties && Object.keys(item.properties).length > 1) {
            const conditionSchema = item.properties?.[conditionField];
            // Get all properties except the condition field itself
            Object.keys(item.properties).forEach((prop) => {
              if (prop !== conditionField) {
                // Check if this dependency entry already exists
                const existingIndex = dependencyEntries.findIndex(
                  (entry) => entry.parentField === conditionField && entry.dependentField === prop
                );
                
                if (existingIndex === -1) {
                  // Create a new evaluator for this specific field
                  const fieldEvaluator = buildConditionEvaluator(conditionSchema);
                  dependencyEntries.push({
                    parentField: conditionField,
                    dependentField: prop,
                    shouldDisplay: fieldEvaluator,
                  });
                }
              }
            });
          }
        });
      }
    });

    // Process allOf pattern with if/then conditions
    if (Array.isArray(baseSchema.allOf)) {
      baseSchema.allOf.forEach((allOfItem: any) => {
        if (allOfItem.if && allOfItem.then) {
          const ifCondition = allOfItem.if;
          // Extract the condition field and value from if.properties
          if (ifCondition.properties) {
            Object.keys(ifCondition.properties).forEach((conditionField) => {
              const conditionSchema = ifCondition.properties[conditionField];
              const evaluator = buildConditionEvaluator(conditionSchema);
              
              // Extract dependent fields from then.properties
              if (allOfItem.then.properties) {
                Object.keys(allOfItem.then.properties).forEach((dependentField) => {
                  // Check if this dependency entry already exists
                  const existingIndex = dependencyEntries.findIndex(
                    (entry) => entry.parentField === conditionField && entry.dependentField === dependentField
                  );
                  
                  if (existingIndex === -1) {
                    dependencyEntries.push({
                      parentField: conditionField,
                      dependentField: dependentField,
                      shouldDisplay: evaluator,
                    });
                    
                    // Add the dependent field property to baseSchema.properties if it doesn't exist
                    // This ensures the field schema is available when condition is met
                    if (!processedSchema.properties[dependentField] && allOfItem.then.properties[dependentField]) {
                      processedSchema.properties[dependentField] = allOfItem.then.properties[dependentField];
                    }
                  }
                });
              }
            });
          }
        }
      });
    }

    // Get original field order from base schema
    const originalFieldOrder = Object.keys(baseSchema.properties || {});

    // Build ordered properties: insert dependent fields right after their parent
    const orderedProperties: Record<string, any> = {};
    const processedUiSchemaOrdered: Record<string, any> = {
      ...processedUiSchema,
    };
    const addedFields = new Set<string>();

    // First, identify all dependent fields to exclude them from initial rendering
    const allDependentFields = new Set(
      dependencyEntries.map((entry) => entry.dependentField)
    );

    // Build ordered properties with dependent fields right after their parents
    originalFieldOrder.forEach((fieldName) => {
      // Skip if already added
      if (addedFields.has(fieldName)) {
        return;
      }

      // Skip dependent fields - they will be added conditionally after their parent
      if (allDependentFields.has(fieldName)) {
        return;
      }

      // This is a regular field or condition field (checkbox) - add it ONCE
      orderedProperties[fieldName] = { ...baseSchema.properties[fieldName] };

      // Ensure RTL options are set for this field
      if (!processedUiSchemaOrdered[fieldName]) {
        processedUiSchemaOrdered[fieldName] = {};
      }
      if (!processedUiSchemaOrdered[fieldName]["ui:options"]) {
        processedUiSchemaOrdered[fieldName]["ui:options"] = {
          dir: "rtl",
          textAlign: "right",
        };
      } else {
        processedUiSchemaOrdered[fieldName]["ui:options"] = {
          ...processedUiSchemaOrdered[fieldName]["ui:options"],
          dir: "rtl",
          textAlign: "right",
        };
      }

      // For checkbox (boolean) fields, ensure title is preserved in schema
      // The widget will use schema.title directly, so we keep it in the schema
      if (baseSchema.properties[fieldName]?.type === "boolean") {
        const originalField = baseSchema.properties[fieldName];
        if (originalField?.title) {
          orderedProperties[fieldName].title = originalField.title;
        }
      }

      // For nested object fields, preserve the title so ObjectFieldTemplate can display it
      if (baseSchema.properties[fieldName]?.type === "object") {
        const originalField = baseSchema.properties[fieldName];
        if (originalField?.title) {
          orderedProperties[fieldName].title = originalField.title;
        }
      }

      addedFields.add(fieldName);

      // Check if this field has dependent fields that should be shown
      const dependentsForField = dependencyEntries.filter(
        (entry) => entry.parentField === fieldName
      );

      if (dependentsForField.length > 0) {
        const conditionValue = currentFormData ? currentFormData[fieldName] : undefined;
        dependentsForField.forEach((dep) => {
          if (
            !addedFields.has(dep.dependentField) &&
            dep.shouldDisplay(conditionValue)
          ) {
            // Try to get the property from multiple sources:
            // 1. processedSchema.properties (includes fields from allOf.then.properties)
            // 2. baseSchema.properties
            // 3. dependencies oneOf
            let dependentProperty = processedSchema.properties?.[dep.dependentField] 
              || baseSchema.properties?.[dep.dependentField];
            
            // If not found in base properties, look in dependency properties
            if (!dependentProperty && baseSchema.dependencies?.[fieldName]?.oneOf) {
              for (const oneOfCase of baseSchema.dependencies[fieldName].oneOf) {
                if (oneOfCase.properties?.[dep.dependentField]) {
                  dependentProperty = oneOfCase.properties[dep.dependentField];
                  break;
                }
              }
            }
            
            // If still not found, check allOf.then.properties
            if (!dependentProperty && Array.isArray(baseSchema.allOf)) {
              for (const allOfItem of baseSchema.allOf) {
                if (allOfItem.then?.properties?.[dep.dependentField]) {
                  dependentProperty = allOfItem.then.properties[dep.dependentField];
                  break;
                }
              }
            }
            
            if (dependentProperty) {
              orderedProperties[dep.dependentField] = dependentProperty;
              
              // Recursively process dependencies for this newly added dependent field
              // This handles nested dependencies (e.g., pain_aggravating_factors → pain_aggravating_factors_other)
              const nestedDependents = dependencyEntries.filter(
                (entry) => entry.parentField === dep.dependentField
              );
              
              if (nestedDependents.length > 0) {
                const nestedConditionValue = currentFormData ? currentFormData[dep.dependentField] : undefined;
                nestedDependents.forEach((nestedDep) => {
                  if (
                    !addedFields.has(nestedDep.dependentField) &&
                    nestedDep.shouldDisplay(nestedConditionValue)
                  ) {
                    // Get nested dependent property
                    let nestedProperty = processedSchema.properties?.[nestedDep.dependentField] 
                      || baseSchema.properties?.[nestedDep.dependentField];
                    
                    if (!nestedProperty && Array.isArray(baseSchema.allOf)) {
                      for (const allOfItem of baseSchema.allOf) {
                        if (allOfItem.then?.properties?.[nestedDep.dependentField]) {
                          nestedProperty = allOfItem.then.properties[nestedDep.dependentField];
                          break;
                        }
                      }
                    }
                    
                    if (nestedProperty) {
                      orderedProperties[nestedDep.dependentField] = nestedProperty;
                      addedFields.add(nestedDep.dependentField);
                      
                      // Set up uiSchema for nested dependent
                      if (!processedUiSchemaOrdered[nestedDep.dependentField]) {
                        processedUiSchemaOrdered[nestedDep.dependentField] = {};
                      }
                      processedUiSchemaOrdered[nestedDep.dependentField] = {
                        ...(originalUiSchema && originalUiSchema[nestedDep.dependentField]
                          ? originalUiSchema[nestedDep.dependentField]
                          : {}),
                        "ui:widget":
                          originalUiSchema &&
                          originalUiSchema[nestedDep.dependentField] &&
                          originalUiSchema[nestedDep.dependentField]["ui:widget"]
                            ? originalUiSchema[nestedDep.dependentField]["ui:widget"]
                            : "text",
                        "ui:options": {
                          ...(originalUiSchema &&
                          originalUiSchema[nestedDep.dependentField] &&
                          originalUiSchema[nestedDep.dependentField]["ui:options"]
                            ? originalUiSchema[nestedDep.dependentField]["ui:options"]
                            : {}),
                          dir: "rtl",
                          textAlign: "right",
                        },
                      };
                    }
                  }
                });
              }
            }

            // Ensure RTL options are set for dependent field
            if (!processedUiSchemaOrdered[dep.dependentField]) {
              processedUiSchemaOrdered[dep.dependentField] = {};
            }
            processedUiSchemaOrdered[dep.dependentField] = {
              ...(originalUiSchema && originalUiSchema[dep.dependentField]
                ? originalUiSchema[dep.dependentField]
                : {}),
              "ui:widget":
                originalUiSchema &&
                originalUiSchema[dep.dependentField] &&
                originalUiSchema[dep.dependentField]["ui:widget"]
                  ? originalUiSchema[dep.dependentField]["ui:widget"]
                  : "text",
              "ui:options": {
                ...(originalUiSchema &&
                originalUiSchema[dep.dependentField] &&
                originalUiSchema[dep.dependentField]["ui:options"]
                  ? originalUiSchema[dep.dependentField]["ui:options"]
                  : {}),
                dir: "rtl",
                textAlign: "right",
              },
            };
            addedFields.add(dep.dependentField);
          }
        });
      }
    });

    // Recursively process nested object fields so their own dependencies work
    Object.keys(orderedProperties).forEach((fieldName) => {
      const fieldSchema = orderedProperties[fieldName];
      if (fieldSchema?.type === "object") {
        const originalTitle = fieldSchema.title;
        const childFormData = currentFormData ? currentFormData[fieldName] || {} : {};
        const originalFieldUiSchema = processedUiSchemaOrdered[fieldName] || {};

        const { schema: childSchema, uiSchema: childUiSchema } = processConditionalSchema(
          fieldSchema,
          childFormData,
          originalFieldUiSchema
        );

        // Ensure the child schema's required array only includes visible fields
        if (childSchema && Array.isArray(childSchema.required) && childSchema.properties) {
          childSchema.required = childSchema.required.filter(
            (fieldName: string) => !!childSchema.properties[fieldName]
          );
        }
        
        // Remove allOf and dependencies from child schema to prevent RJSF from validating them
        if (childSchema) {
          delete childSchema.allOf;
          delete childSchema.dependencies;
        }

        orderedProperties[fieldName] = childSchema;

        // Preserve object title for ObjectFieldTemplate rendering
        if (originalTitle && !orderedProperties[fieldName].title) {
          orderedProperties[fieldName].title = originalTitle;
        }

        // Merge container-level uiSchema (like ui:order) with processed child uiSchema
        processedUiSchemaOrdered[fieldName] = {
          ...originalFieldUiSchema,
          ...childUiSchema,
        };
      }
    });

    // Remove dependencies and allOf from schema to prevent RJSF from validating them directly
    // We handle conditional logic ourselves through the processed schema
    processedSchema.properties = orderedProperties;
    delete processedSchema.dependencies;
    delete processedSchema.allOf;

    // Process conditional required fields from allOf.then blocks
    const conditionalRequiredFields: Array<{
      fieldName: string;
      conditionField: string;
      shouldBeRequired: (parentValue: any) => boolean;
    }> = [];
    
    if (Array.isArray(baseSchema.allOf)) {
      baseSchema.allOf.forEach((allOfItem: any) => {
        if (allOfItem.if && allOfItem.then && Array.isArray(allOfItem.then.required)) {
          const ifCondition = allOfItem.if;
          if (ifCondition.properties) {
            Object.keys(ifCondition.properties).forEach((conditionField) => {
              const conditionSchema = ifCondition.properties[conditionField];
              const evaluator = buildConditionEvaluator(conditionSchema);
              
              allOfItem.then.required.forEach((requiredField: string) => {
                conditionalRequiredFields.push({
                  fieldName: requiredField,
                  conditionField: conditionField,
                  shouldBeRequired: evaluator,
                });
              });
            });
          }
        }
      });
    }
    
    // Build the final required array: base required + conditional required (only if condition is met and field is visible)
    const baseRequired = Array.isArray(processedSchema.required) 
      ? processedSchema.required.filter((fieldName: string) => !!orderedProperties[fieldName])
      : [];
    
    const conditionalRequired = conditionalRequiredFields
      .filter((item) => {
        // Only include if field is visible
        if (!orderedProperties[item.fieldName]) return false;
        
        // Check if condition is met
        const conditionValue = currentFormData ? currentFormData[item.conditionField] : undefined;
        return item.shouldBeRequired(conditionValue);
      })
      .map((item) => item.fieldName);
    
    // Combine and deduplicate, ensuring all required fields actually exist in properties
    const allRequired = Array.from(new Set([...baseRequired, ...conditionalRequired]));
    processedSchema.required = allRequired.filter((fieldName: string) => {
      // Field must exist in orderedProperties
      return !!orderedProperties[fieldName];
    });

    // Filter ui:order to only include fields that are actually rendered
    if (Array.isArray(processedUiSchemaOrdered["ui:order"])) {
      processedUiSchemaOrdered["ui:order"] = processedUiSchemaOrdered["ui:order"].filter(
        (fieldName: string) => !!orderedProperties[fieldName]
      );
    }

    // Remove title to hide it from the form
    delete processedSchema.title;

    return { schema: processedSchema, uiSchema: processedUiSchemaOrdered };
  };

  // Always compute processed schema to keep hook order stable across renders
  const processedSchema = useMemo(() => {
    if (!schema) {
      return { schema: null, uiSchema: {} };
    }
    return processConditionalSchema(schema, rjsfFormData, uiSchema);
  }, [schema, rjsfFormData, uiSchema]);

  // Helper function to extract media from form data
  const extractMediaFromFormData = (formData: any, schema: any): { media_content: string | null; original_filename: string | null; cleanedFormData: any } => {
    if (!formData || !schema || !schema.properties) {
      return { media_content: null, original_filename: null, cleanedFormData: formData || {} };
    }

    let mediaContent: string | null = null;
    let originalFilename: string | null = null;
    const cleanedFormData: any = { ...formData };

    // Recursively search for file fields in form data
    const findMediaFields = (data: any, properties: any, cleanedData: any, path: string = ""): void => {
      if (!data || typeof data !== "object" || Array.isArray(data)) return;
      if (!cleanedData || typeof cleanedData !== "object" || Array.isArray(cleanedData)) return;

      Object.keys(properties || {}).forEach((key) => {
        const fieldSchema = properties[key];
        const fieldValue = data[key];
        const fieldPath = path ? `${path}.${key}` : key;

        if (fieldValue === undefined || fieldValue === null) return;

        // Check if this field is a file field (format: data-url or widget: file)
        // Handle both single file (string with format: data-url) and multiple files (array with items format: data-url)
        const isFileField = (fieldSchema?.format === "data-url") || 
                           (fieldSchema?.type === "string" && fieldSchema?.format === "data-url") ||
                           (fieldSchema?.type === "array" && fieldSchema?.items?.format === "data-url");
        
        // Also check if the value itself looks like a file (data URL or file object)
        const valueLooksLikeFile = fieldValue && (
          (typeof fieldValue === "string" && fieldValue.startsWith("data:")) ||
          (typeof fieldValue === "object" && fieldValue !== null && !Array.isArray(fieldValue) && (fieldValue.dataUrl || fieldValue.value)) ||
          (Array.isArray(fieldValue) && fieldValue.length > 0 && (
            (typeof fieldValue[0] === "string" && fieldValue[0].startsWith("data:")) ||
            (typeof fieldValue[0] === "object" && fieldValue[0] !== null && (fieldValue[0].dataUrl || fieldValue[0].value))
          ))
        );
        
        // Use file field detection OR value-based detection
        const shouldProcessAsFile = isFileField || valueLooksLikeFile;

        if (shouldProcessAsFile) {
          // Handle array of files (multiple images)
          if (Array.isArray(fieldValue)) {
            // Process first image (backend currently supports one media per submission)
            // In the future, backend can be updated to accept array of media files
            if (fieldValue.length > 0) {
              const firstFile = fieldValue[0];
              
              if (typeof firstFile === "object" && firstFile !== null) {
                const dataUrl = firstFile.dataUrl || firstFile.value || "";
                const filename = firstFile.filename || firstFile.original_filename || "";
                
                if (dataUrl && dataUrl.startsWith("data:")) {
                  const base64Match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
                  if (base64Match && base64Match[1] && !mediaContent) {
                    mediaContent = base64Match[1];
                    originalFilename = filename || `file_${fieldPath.replace(/\./g, "_")}`;
                  }
                }
              } else if (typeof firstFile === "string" && firstFile.startsWith("data:")) {
                const base64Match = firstFile.match(/^data:[^;]+;base64,(.+)$/);
                if (base64Match && base64Match[1] && !mediaContent) {
                  mediaContent = base64Match[1];
                  const filenameMatch = firstFile.match(/filename=([^;]+)/);
                  originalFilename = filenameMatch ? filenameMatch[1] : `file_${fieldPath.replace(/\./g, "_")}`;
                }
              }
            }
            // Remove from cleaned form data (media is sent separately)
            if (path) {
              const pathParts = path.split(".");
              let current = cleanedData;
              for (let i = 0; i < pathParts.length; i++) {
                if (!current[pathParts[i]]) {
                  current[pathParts[i]] = {};
                }
                current = current[pathParts[i]];
              }
              delete current[key];
            } else {
              delete cleanedData[key];
            }
          } else if (typeof fieldValue === "object" && fieldValue !== null && !Array.isArray(fieldValue)) {
            // Handle single object format: { dataUrl: "...", filename: "..." }
            const dataUrl = fieldValue.dataUrl || fieldValue.value || "";
            const filename = fieldValue.filename || fieldValue.original_filename || "";
            if (dataUrl && dataUrl.startsWith("data:")) {
              // Extract base64 part from data URL
              const base64Match = dataUrl.match(/^data:[^;]+;base64,(.+)$/);
              if (base64Match && base64Match[1]) {
                // Use the first media field found (backend supports one media per submission)
                if (!mediaContent) {
                  mediaContent = base64Match[1];
                  originalFilename = filename || `file_${fieldPath.replace(/\./g, "_")}`;
                }
                // Remove from cleaned form data (media is sent separately)
                if (path) {
                  // Nested field - navigate to the nested object
                  const pathParts = path.split(".");
                  let current = cleanedData;
                  for (let i = 0; i < pathParts.length; i++) {
                    if (!current[pathParts[i]]) {
                      current[pathParts[i]] = {};
                    }
                    current = current[pathParts[i]];
                  }
                  delete current[key];
                } else {
                  delete cleanedData[key];
                }
              }
            }
          } else if (typeof fieldValue === "string" && fieldValue.startsWith("data:")) {
            // Handle string data URL format
            const base64Match = fieldValue.match(/^data:[^;]+;base64,(.+)$/);
            if (base64Match && base64Match[1]) {
              if (!mediaContent) {
                mediaContent = base64Match[1];
                // Try to extract filename from data URL if available
                const filenameMatch = fieldValue.match(/filename=([^;]+)/);
                originalFilename = filenameMatch ? filenameMatch[1] : `file_${fieldPath.replace(/\./g, "_")}`;
              }
              if (path) {
                // Nested field - navigate to the nested object
                const pathParts = path.split(".");
                let current = cleanedData;
                for (let i = 0; i < pathParts.length; i++) {
                  if (!current[pathParts[i]]) {
                    current[pathParts[i]] = {};
                  }
                  current = current[pathParts[i]];
                }
                delete current[key];
              } else {
                delete cleanedData[key];
              }
            }
          }
        } else if (fieldSchema?.type === "object" && fieldSchema?.properties) {
          // Recursively search nested objects
          if (!cleanedData[key]) {
            cleanedData[key] = {};
          }
          findMediaFields(fieldValue, fieldSchema.properties, cleanedData[key], fieldPath);
        }
      });
    };

    findMediaFields(formData, schema.properties, cleanedFormData);

    return {
      media_content: mediaContent,
      original_filename: originalFilename,
      cleanedFormData,
    };
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
        return;
      }
    }

    // For filled_form mode, require submissionId
    if (mode === "filled_form") {
      if (!submissionId) {
        return;
      }
    }

    try {
      // Extract national_code from patientContext
      const nationalCode = patientContext?.national_code || patientContext?.nationalCode || "";
      
      // Extract patient_name from patientContext
      const patientName = patientContext?.patient_name || patientContext?.patientName || "";
      
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
      
      // Extract media from form data
      const { media_content, original_filename, cleanedFormData } = extractMediaFromFormData(
        submittedData,
        schema
      );
      
      // Build payload according to the required schema
      const payload: any = {
        patient_data: {
          national_code: nationalCode,
          patient_name: patientName,
          data: cleanedFormData || {}, // The actual form field values (without media fields)
        },
        form_data: {
          user_id: userId,
          created_at: createdAt,
          template_id: templateIdNum,
          template_name: templateInfo.name || formName || "",
        },
      };

      // Add media if present
      if (media_content) {
        payload.media_content = media_content;
        if (original_filename) {
          payload.original_filename = original_filename;
        }
      }

      const httpMethod = mode === "template" ? "POST" : "PUT";
      
      // Automatically construct the URL based on mode and available props
      let finalSubmitUrl: string;
      
      if (submitUrl) {
        // Normalize submitUrl to always go to backend, even if it's a relative path
        const baseUrlForSubmit = getBaseUrl();

        // Safety check: ensure base URL is valid and not frontend
        if (!baseUrlForSubmit || baseUrlForSubmit.includes("historio-frontend")) {
          throw new Error(`Invalid API base URL: ${baseUrlForSubmit}. Must point to backend, not frontend.`);
        }

        // If submitUrl is relative (starts with /api/...), resolve it against backend base URL
        if (!submitUrl.startsWith("http://") && !submitUrl.startsWith("https://")) {
          const urlObj = new URL(submitUrl, baseUrlForSubmit);
          finalSubmitUrl = urlObj.toString();
        } else {
          finalSubmitUrl = submitUrl;
        }

        // For PUT with submissionId, ensure query param is present (if missing)
        if (httpMethod === "PUT" && submissionId) {
          const urlObj = new URL(finalSubmitUrl);
          if (!urlObj.searchParams.get("submission_id")) {
            urlObj.searchParams.set("submission_id", submissionId);
            finalSubmitUrl = urlObj.toString();
          }
        }
      } else {
        // Auto-construct URL from base URL
        const baseUrl = getBaseUrl();
        
        // Safety check: ensure baseUrl is valid and not frontend
        if (!baseUrl || baseUrl.includes("historio-frontend")) {
          throw new Error(`Invalid API base URL: ${baseUrl}. Must point to backend, not frontend.`);
        }
        
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
          return; // Exit early, don't show success message
        }
      }
      
      showMessage("فرم با موفقیت ارسال شد!", "success");
      onSubmitData?.(result);
    } catch (err: any) {
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
[data-form-container] {
          /* Allow selecting text inside the form even if parent containers disable selection */
          user-select: text;
          -webkit-user-select: text;
          -ms-user-select: text;
          direction: rtl;
          text-align: right;
          font-family: Vazirmatn, sans-serif !important;
        }
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
                key={`form-${mode}-${templateInfo.id || templateId || 'unknown'}-${JSON.stringify(rjsfFormData).slice(0, 100)}`}
                schema={processedSchema.schema}
                uiSchema={processedSchema.uiSchema}
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