// @ts-nocheck
// @TODO: fix the type in this component
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Text, Button } from "@radix-ui/themes";
import { Heading } from "@/common/typography";

import styles from "./styles.module.css";

export const Toast = ({ toast, onClose }) => {
  return (
    <ToastPrimitive.Root
      className={styles.ToastRoot}
      duration={toast.duration ?? 3000}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ToastPrimitive.Title className={styles.ToastTitle}>
        <Heading size='1'> {toast.title}</Heading>
      </ToastPrimitive.Title>
      {toast.description ? (
        <ToastPrimitive.Description>
          <Text>{toast.description}</Text>
        </ToastPrimitive.Description>
      ) : null}
      {toast.action ? (
        <ToastPrimitive.Action
          altText='a'
          asChild
          className={styles.ToastAction}
        >
          {toast.action}
        </ToastPrimitive.Action>
      ) : (
        <ToastPrimitive.Close asChild>
          <Button
            className={styles.ToastAction}
            type='button'
            aria-label='Close'
          >
            X
          </Button>
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  );
};
