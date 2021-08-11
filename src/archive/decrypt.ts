


export function decryptNg(data) {
    
    // var decryptedData = new byte[data.Length];

    // var keyuints = new uint[key.Length / 4];
    // Buffer.BlockCopy(key, 0, keyuints, 0, key.Length);

    // for (int blockIndex = 0; blockIndex < data.Length / 16; blockIndex++)
    // {
    //     var encryptedBlock = new byte[16];
    //     Array.Copy(data, 16 * blockIndex, encryptedBlock, 0, 16);
    //     var decryptedBlock = DecryptNGBlock(encryptedBlock, keyuints);
    //     Array.Copy(decryptedBlock, 0, decryptedData, 16 * blockIndex, 16);
    // }

    // if (data.Length % 16 != 0)
    // {
    //     var left = data.Length % 16;
    //     Buffer.BlockCopy(data, data.Length - left, decryptedData, data.Length - left, left);
    // }

    // return decryptedData;

}

function decryptNgBlock () {

    // var buffer = data;

    // // prepare key...
    // var subKeys = new uint[17][];
    // for (int i = 0; i < 17; i++)
    // {
    //     subKeys[i] = new uint[4];
    //     subKeys[i][0] = key[4 * i + 0];
    //     subKeys[i][1] = key[4 * i + 1];
    //     subKeys[i][2] = key[4 * i + 2];
    //     subKeys[i][3] = key[4 * i + 3];
    // }

    // buffer = DecryptNGRoundA(buffer, subKeys[0], GTA5Keys.PC_NG_DECRYPT_TABLES[0]);
    // buffer = DecryptNGRoundA(buffer, subKeys[1], GTA5Keys.PC_NG_DECRYPT_TABLES[1]);
    // for (int k = 2; k <= 15; k++)
    //     buffer = DecryptNGRoundB(buffer, subKeys[k], GTA5Keys.PC_NG_DECRYPT_TABLES[k]);
    // buffer = DecryptNGRoundA(buffer, subKeys[16], GTA5Keys.PC_NG_DECRYPT_TABLES[16]);

    // return buffer;
}

function GetNGKey(name: string, nBytes: number)
{
    // const hash = hash(name);
    // const keyIndex = (hash + nBytes + (101 - 40)) % 0x65;
    // return PC_NG_KEYS[keyIndex];
}