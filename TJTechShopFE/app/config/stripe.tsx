import Stripe from 'stripe';

if (!process.env.sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ) {
    throw new Error('sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ is missing. Please set the environment variable.');
}

const stripe = new Stripe(process.env.sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ, {
    apiVersion: "2023-10-16",
});

export default stripe;