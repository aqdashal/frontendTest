const LOGGER_URL = 'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f';

export async function fetchLoggers() {
    const response = await fetch(`${LOGGER_URL}`);
    return await response.json();
}