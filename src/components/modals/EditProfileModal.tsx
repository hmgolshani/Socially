import { useId, useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type EditProfileValues = {
  name: string;
  bio: string;
  location: string;
  website: string;
};

type EditProfileModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Partial<EditProfileValues>;
  onSave: (values: EditProfileValues) => void;
};

type EditProfileFormProps = {
  initialValues?: Partial<EditProfileValues>;
  onSave: (values: EditProfileValues) => void;
  onClose: () => void;
};

function EditProfileForm({
  initialValues,
  onSave,
  onClose,
}: EditProfileFormProps) {
  const id = useId();
  const [values, setValues] = useState<EditProfileValues>(() => ({
    name: initialValues?.name ?? "",
    bio: initialValues?.bio ?? "",
    location: initialValues?.location ?? "",
    website: initialValues?.website ?? "",
  }));

  const updateValue = (field: keyof EditProfileValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const isNameValid = values.name.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNameValid) return;

    onSave({ ...values, name: values.name.trim() });
    onClose();
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <DialogTitle className="text-xl font-semibold text-content-primary">
          Edit Profile
        </DialogTitle>
        <DialogClose
          aria-label="Close"
          render={
            <Button className="size-8 rounded-md" size="icon" variant="ghost" />
          }
        >
          <X aria-hidden="true" className="size-4" />
        </DialogClose>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field className="gap-2">
          <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
          <Input
            autoComplete="name"
            className="h-9 rounded-md"
            id={`${id}-name`}
            required
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
          />
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor={`${id}-bio`}>Bio</FieldLabel>
          <Textarea
            className="h-[116px] min-h-[116px] resize-none rounded-md"
            id={`${id}-bio`}
            placeholder="Enter your Bio"
            value={values.bio}
            onChange={(event) => updateValue("bio", event.target.value)}
          />
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor={`${id}-location`}>Location</FieldLabel>
          <Input
            autoComplete="address-level2"
            className="h-9 rounded-md"
            id={`${id}-location`}
            placeholder="Where you are at"
            value={values.location}
            onChange={(event) => updateValue("location", event.target.value)}
          />
        </Field>

        <Field className="gap-2">
          <FieldLabel htmlFor={`${id}-website`}>Website</FieldLabel>
          <Input
            autoComplete="url"
            className="h-9 rounded-md"
            id={`${id}-website`}
            placeholder="Your personal website"
            type="url"
            value={values.website}
            onChange={(event) => updateValue("website", event.target.value)}
          />
        </Field>

        <div className="flex justify-end pt-1">
          <Button
            className="h-9 min-w-[142px] rounded-md"
            type="submit"
            disabled={!isNameValid}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
}

export default function EditProfileModal({
  open,
  onOpenChange,
  initialValues,
  onSave,
}: EditProfileModalProps) {
  const close = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-lg border border-layout-border bg-layout-card p-6 text-content-primary shadow-lg ring-0 sm:max-w-125 data-open:animate-none data-closed:animate-none"
      >
        {open && (
          <EditProfileForm
            initialValues={initialValues}
            onSave={onSave}
            onClose={close}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
