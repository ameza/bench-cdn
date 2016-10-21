#!/usr/bin/env bash
node bench \
    --files https://s3.amazonaws.com/cdn.andresmeza.com/Gif/12kB.jpg,https://s3.amazonaws.com/cdn.andresmeza.com/Gif/200kB.jpg,https://s3.amazonaws.com/cdn.andresmeza.com/Gif/8MB.jpg \
    --interval 300 \
    --limit 288 \
    --out resultsamazons3.csv