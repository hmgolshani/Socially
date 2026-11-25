import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

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
  titleId: string;
  initialValues?: Partial<EditProfileValues>;
  onSave: (values: EditProfileValues) => void;
  onClose: () => void;
};

function EditProfileForm({
  titleId,
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(values);
    onClose();
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-content-primary" id={titleId}>
          Edit Profile
        </h2>
        <Button
          aria-label="Close"
          className="size-8 rounded-md"
          size="icon"
          type="button"
          variant="ghost"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field className="gap-2">
          <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
          <Input
            autoComplete="name"
            className="h-9 rounded-md"
            id={`${id}-name`}
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
          <FieldLabel htmlFor={`${id}-website`}>Name</FieldLabel>
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

        <div className="flex justify-end gap-3 pt-1">
          <Button
            className="h-9 rounded-md"
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="h-9 min-w-[142px] rounded-md" type="submit">
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => onOpenChange(false);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[500px] overflow-y-auto rounded-lg border border-layout-border bg-layout-card p-6 text-content-primary shadow-lg backdrop:backdrop-blur-sm backdrop:backdrop-brightness-50"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClose={close}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const clickedOutside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (clickedOutside) close();
      }}
    >
      {open && (
        <EditProfileForm
          titleId={`${id}-title`}
          initialValues={initialValues}
          onSave={onSave}
          onClose={close}
        />
      )}
    </dialog>
  );
}
