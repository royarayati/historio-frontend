import * as React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema, UiSchema } from "@rjsf/utils";

// Test schema definition
const schema: RJSFSchema = {
  title: "User Registration Form",
  description: "A simple form example using React JSON Schema Form",
  type: "object",
  required: ["firstName", "lastName", "email"],
  properties: {
    firstName: {
      type: "string",
      title: "First Name",
      default: "John"
    },
    lastName: {
      type: "string",
      title: "Last Name",
      default: "Doe"
    },
    email: {
      type: "string",
      format: "email",
      title: "Email Address"
    },
    age: {
      type: "integer",
      title: "Age",
      minimum: 0,
      maximum: 150
    },
    bio: {
      type: "string",
      title: "Bio",
      minLength: 10
    },
    password: {
      type: "string",
      title: "Password",
      minLength: 8
    },
    telephone: {
      type: "string",
      title: "Telephone",
      minLength: 10
    },
    dateOfBirth: {
      type: "string",
      format: "date",
      title: "Date of Birth"
    },
    country: {
      type: "string",
      title: "Country",
      enum: ["USA", "Canada", "UK", "Germany", "France", "Other"],
      enumNames: ["United States", "Canada", "United Kingdom", "Germany", "France", "Other"]
    } as any,
    interests: {
      type: "array",
      title: "Interests",
      items: {
        type: "string",
        enum: ["coding", "reading", "traveling", "music", "sports"],
        enumNames: ["Coding", "Reading", "Traveling", "Music", "Sports"]
      } as any,
      uniqueItems: true
    },
    newsletter: {
      type: "boolean",
      title: "Subscribe to Newsletter",
      default: false
    },
    experience: {
      type: "number",
      title: "Years of Experience",
      minimum: 0,
      maximum: 50
    }
  }
};

const uiSchema: UiSchema = {
  firstName: {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:placeholder": "Enter your first name"
  },
  lastName: {
    "ui:emptyValue": "",
    "ui:placeholder": "Enter your last name"
  },
  email: {
    "ui:emptyValue": "",
    "ui:placeholder": "example@email.com",
    "ui:options": {
      inputType: "email"
    }
  },
  bio: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 5
    },
    "ui:placeholder": "Tell us about yourself (minimum 10 characters)"
  },
  password: {
    "ui:widget": "password",
    "ui:help": "Password must be at least 8 characters long"
  },
  telephone: {
    "ui:options": {
      inputType: "tel"
    },
    "ui:placeholder": "123-456-7890"
  },
  dateOfBirth: {
    "ui:widget": "date"
  },
  country: {
    "ui:widget": "select",
    "ui:placeholder": "Select a country"
  },
  interests: {
    "ui:widget": "checkboxes"
  },
  newsletter: {
    "ui:widget": "radio",
    "ui:options": {
      inline: true
    }
  },
  experience: {
    "ui:widget": "range"
  }
};

function RjsfTestPage() {
  const [formData, setFormData] = React.useState({});

  const handleSubmit = ({ formData }: any) => {
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  const handleChange = ({ formData }: any) => {
    setFormData(formData);
  };

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "50px auto", 
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ marginBottom: "30px", color: "#333" }}>
        React JSON Schema Form Test
      </h1>
      
      <div style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          validator={validator}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>

      <div style={{ 
        marginTop: "30px", 
        padding: "15px", 
        backgroundColor: "#f0f0f0", 
        borderRadius: "4px" 
      }}>
        <h3>Current Form Data:</h3>
        <pre style={{ 
          backgroundColor: "#fff", 
          padding: "10px", 
          borderRadius: "4px",
          overflow: "auto"
        }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default RjsfTestPage;

