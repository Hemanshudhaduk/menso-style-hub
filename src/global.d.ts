// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => {
//       open: () => void;
//     };
//     upiValidationTimeout?: NodeJS.Timeout;
//   }
// }

declare global {
  interface Window {
    Razorpay: any;
    upiValidationTimeout?: ReturnType<typeof setTimeout>;
  }
}

export {};
// --- a/vscode-chat-code-block://3843d78c-eceb-42a5