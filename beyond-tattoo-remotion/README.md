# Beyond Tattoo — Remotion Pack Opening

Vertical 1080×1920, 10-second, 60fps pack-opening animation.

## In GitHub Codespaces

```bash
npm install
npm run dev
```

Open forwarded port 3000 and select **BeyondTattooPack**.

## Render a quick half-resolution preview

```bash
npm run render:half
```

## Render the full MP4

```bash
npm run render
```

Output:

```text
out/Beyond-Tattoo-Pack.mp4
```

## Replace the reveal artwork

Replace `public/stencil.jpg` with another image using the same filename, or edit `stencilFile` in `src/Root.tsx`.

## Push this project into an empty GitHub repository

Upload all files in this folder through the GitHub web interface, or use the Codespaces terminal:

```bash
git add .
git commit -m "Add Beyond Tattoo Remotion pack opening"
git push origin main
```
