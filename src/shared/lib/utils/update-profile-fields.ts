import { type ProfileField } from '../../ui/profile-field';

export const updateProfileFields = (
  fields: ProfileField[],
  getValue: (fieldName: string) => string,
) => {
  fields.forEach((field) => {
    const value = getValue(field.props.name);
    if (!value) return;
    field.setValue(value);
  });
};
