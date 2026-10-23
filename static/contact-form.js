(() => {
  'use strict';

  const templates = {
    work: `Hello,

I am reaching out about [role or opportunity] at [organisation], focused on [responsibilities]. The arrangement is [location or remote], with a proposed start of [date] and compensation of [range, if available].

Could we arrange [a call or next step] to discuss the fit?

Thank you,
[Your name]`,
    collaboration: `Hello,

We are working on [project] to address [problem] for [audience]. We would like to collaborate on [specific deliverable or responsibility]. Our current stage is [stage], timeline is [dates], and budget or partnership arrangement is [details].

Could we discuss the scope and a suitable next step?

Thank you,
[Name / organisation]`,
    demonstration: `Hello,

I am exploring [project or topic] for [demonstration, research or evaluation]. I would like to understand [specific question or workflow] with [audience or affiliation].

Would a demonstration or discussion of shareable evidence be possible around [dates and time zone]? Please let me know any access conditions.

Thank you,
[Your name]`,
    other: `Hello,

I am getting in touch about [topic]. The relevant background is [brief context], and my specific request is [question or action]. I am hoping to achieve [outcome] by [date, if applicable].

Please let me know whether this is something we could discuss and a suitable next step.

Thank you,
[Your name]`
  };

  function initialise(form) {
    if (form.dataset.contactReady) return;
    const section = form.closest('.contact-form-section');
    const fields = Object.fromEntries(['name', 'email', 'category', 'message', 'template']
      .map(name => [name, form.elements.namedItem(name)]));
    const honeypot = form.querySelector('[data-contact-honeypot]');
    const submit = form.querySelector('[data-contact-submit]');
    const status = form.querySelector('[data-contact-status]');
    const receipt = form.querySelector('[data-contact-receipt]');
    const apply = form.querySelector('[data-apply-template]');
    const replacement = form.querySelector('[data-replace-template]');
    const confirm = form.querySelector('[data-confirm-template]');
    const cancel = form.querySelector('[data-cancel-template]');
    const endpoint = form.getAttribute('data-contact-ajax') || form.getAttribute('action');
    const formSubmit = form.dataset.contactProvider === 'formsubmit';
    let pending = false;
    let replacementKey = '';
    let lastTemplate = '';

    function announce(message, state = '') {
      status.textContent = message;
      section.dataset.contactState = state;
      receipt.hidden = state !== 'accepted';
    }

    function dismissReplacement() {
      replacement.hidden = true;
      replacementKey = '';
    }

    function edited() {
      if (pending) return;
      announce('');
      submit.disabled = !endpoint;
      submit.textContent = 'Send message';
    }

    function applyTemplate(key) {
      fields.message.value = templates[key];
      fields.category.value = key;
      lastTemplate = templates[key];
      fields.message.setCustomValidity('');
      fields.message.removeAttribute('aria-invalid');
      fields.category.setCustomValidity('');
      fields.category.removeAttribute('aria-invalid');
      dismissReplacement();
      edited();
      announce('Template applied. Your message is ready to edit.');
      fields.message.focus();
    }

    function templateSelected() {
      apply.disabled = !Object.hasOwn(templates, fields.template.value);
      dismissReplacement();
    }
    fields.template.addEventListener('change', templateSelected);
    fields.category.addEventListener('change', () => {
      fields.template.value = Object.hasOwn(templates, fields.category.value) ? fields.category.value : '';
      templateSelected();
    });

    apply.addEventListener('click', () => {
      const key = fields.template.value;
      if (!Object.hasOwn(templates, key)) return;
      if (fields.message.value.trim() && fields.message.value !== lastTemplate) {
        replacementKey = key;
        replacement.hidden = false;
        cancel.focus();
      } else {
        applyTemplate(key);
      }
    });

    confirm.addEventListener('click', () => {
      if (replacementKey) applyTemplate(replacementKey);
    });
    cancel.addEventListener('click', () => {
      dismissReplacement();
      apply.focus();
    });
    for (const field of [fields.name, fields.email, fields.category, fields.message]) {
      field.addEventListener('input', () => {
        field.setCustomValidity('');
        field.removeAttribute('aria-invalid');
        dismissReplacement();
        edited();
      });
    }

    function validate() {
      const errors = {
        name: 'Enter your name using 2 to 100 characters.',
        email: 'Enter a valid email address using no more than 254 characters.',
        category: 'Choose an inquiry category.',
        message: 'Enter a message using 20 to 5,000 characters.'
      };
      let firstInvalid;
      for (const key of ['name', 'email', 'category', 'message']) {
        const field = fields[key];
        field.setCustomValidity('');
        const value = field.value.trim();
        const tooShort = field.minLength > 0 && value.length < field.minLength;
        const tooLong = field.maxLength > 0 && field.value.length > field.maxLength;
        if (!value || tooShort || tooLong || (key === 'category' && !Object.hasOwn(templates, value))) {
          field.setCustomValidity(errors[key]);
        }
        const invalid = !field.checkValidity();
        if (invalid) {
          field.setCustomValidity(errors[key]);
          field.setAttribute('aria-invalid', 'true');
          firstInvalid ??= field;
        } else {
          field.removeAttribute('aria-invalid');
        }
      }
      if (firstInvalid) {
        announce(firstInvalid.validationMessage, 'error');
        firstInvalid.reportValidity();
        return false;
      }
      return true;
    }

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (pending || section.dataset.contactState === 'accepted') return;
      if (!endpoint) {
        announce('The contact form is currently unavailable. Please use the email link below.', 'error');
        return;
      }
      if (!validate()) return;
      if (honeypot.value) {
        announce('Unable to submit this form. Please use the email link below.', 'error');
        return;
      }

      const payload = Object.fromEntries(['name', 'email', 'category', 'message']
        .map(key => [key, fields[key].value.trim()]));
      payload[honeypot.name] = honeypot.value;
      if (formSubmit) {
        for (const key of ['_subject', '_template', '_url']) payload[key] = form.elements.namedItem(key).value;
      }
      pending = true;
      dismissReplacement();
      const controls = [...form.elements].map(control => [control, control.disabled]);
      for (const [control] of controls) control.disabled = true;
      form.setAttribute('aria-busy', 'true');
      submit.textContent = 'Sending...';
      announce('Sending your message...', 'pending');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), formSubmit ? 60000 : 15000);
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
          credentials: 'omit',
          redirect: 'error'
        });
        const result = await response.json();
        // An activation notice is not acceptance, even when the service returns success.
        if (formSubmit && /activat|confirm.{0,50}(?:email|form)|verify.{0,50}email/i.test(String(result?.message ?? ''))) {
          throw new Error('activation-required');
        }
        const accepted = formSubmit ? result?.success === true || result?.success === 'true' : result?.ok === true;
        if (!response.ok || !accepted) throw new Error('Acceptance not confirmed');
        announce(formSubmit ? 'Message accepted by FormSubmit for processing.' : 'Message accepted for delivery.', 'accepted');
        submit.textContent = formSubmit ? 'Accepted for processing' : 'Accepted for delivery';
      } catch (error) {
        announce(error.message === 'activation-required'
          ? 'FormSubmit requires the site owner to activate this form. Delivery is not confirmed. Your message is still here; please use the email link.'
          : controller.signal.aborted
            ? 'The contact service timed out. Acceptance is unknown. Your message is still here. Retry or use the email link; retrying may send a duplicate.'
            : 'Delivery acceptance could not be confirmed. Your message is still here. Retry or use the email link; retrying may send a duplicate.', 'error');
        submit.textContent = 'Retry message';
      } finally {
        clearTimeout(timeout);
        pending = false;
        for (const [control, disabled] of controls) control.disabled = disabled;
        submit.disabled = section.dataset.contactState === 'accepted' || !endpoint;
        form.removeAttribute('aria-busy');
        status.focus();
      }
    });

    form.noValidate = true;
    form.dataset.contactReady = 'true';
    form.querySelector('[data-templates]').hidden = false;
  }

  function start() {
    document.querySelectorAll('.contact-form-section form[data-contact-form]').forEach(initialise);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
