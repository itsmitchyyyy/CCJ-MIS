export const appendFormData = (
  formData: FormData,
  data: Record<string, any>,
  parentKey?: string,
) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Date) {
        formData.append(formKey, value.toISOString());
      } else if (value instanceof File) {
        formData.append(formKey, value as unknown as Blob);
      } else if (value instanceof Object) {
        appendFormData(formData, value, formKey);
      } else if (value) {
        formData.append(formKey, value);
      }
    }
  }
};
