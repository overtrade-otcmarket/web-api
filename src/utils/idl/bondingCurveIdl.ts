const idl = {
  address: '2sMZa6c9j5bRBeeLX3sc69XdjWuxDDocZQBds7r9xGy8',
  metadata: {
    name: 'bonding_curve',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'add_liquidity_raydium',
      discriminator: [227, 223, 66, 133, 134, 106, 200, 184],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  67, 117, 114, 118, 101, 67, 111, 110, 102, 105, 103, 117, 114,
                  97, 116, 105, 111, 110,
                ],
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_sol_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'buy',
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  67, 117, 114, 118, 101, 67, 111, 110, 102, 105, 103, 117, 114,
                  97, 116, 105, 111, 110,
                ],
              },
            ],
          },
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_sol_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'claim',
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'create_pool_token20',
      discriminator: [133, 28, 84, 20, 244, 58, 132, 16],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'metadata_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 101, 116, 97, 100, 97, 116, 97],
              },
              {
                kind: 'account',
                path: 'token_metadata_program',
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'account',
              path: 'token_metadata_program',
            },
          },
        },
        {
          name: 'pool_sol_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'token_name',
          type: 'string',
        },
        {
          name: 'token_symbol',
          type: 'string',
        },
        {
          name: 'token_uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'create_pool_token404',
      discriminator: [230, 89, 175, 6, 196, 141, 161, 5],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'metadata_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 101, 116, 97, 100, 97, 116, 97],
              },
              {
                kind: 'account',
                path: 'token_metadata_program',
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'account',
              path: 'token_metadata_program',
            },
          },
        },
        {
          name: 'pool_sol_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'token_name',
          type: 'string',
        },
        {
          name: 'token_symbol',
          type: 'string',
        },
        {
          name: 'token_uri',
          type: 'string',
        },
      ],
    },
    {
      name: 'init_pool_escrow',
      discriminator: [192, 197, 55, 62, 51, 65, 77, 86],
      accounts: [
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_escrow',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [101, 115, 99, 114, 111, 119, 95, 112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'pool_escrow.token',
                account: 'EscrowPool',
              },
              {
                kind: 'account',
                path: 'pool_escrow.collection',
                account: 'EscrowPool',
              },
            ],
          },
        },
        {
          name: 'pool_escrow_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [],
    },
    {
      name: 'init_pool_token404',
      discriminator: [129, 181, 154, 220, 194, 83, 137, 253],
      accounts: [
        {
          name: 'pool_escrow',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [101, 115, 99, 114, 111, 119, 95, 112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'pool.token',
                account: 'LiquidityPool',
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'collection_mint',
          writable: true,
          signer: true,
        },
        {
          name: 'mint_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'metadata',
          writable: true,
        },
        {
          name: 'master_edition',
          writable: true,
        },
        {
          name: 'destination',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'pool.token',
                account: 'LiquidityPool',
              },
            ],
          },
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'token_name',
          type: 'string',
        },
        {
          name: 'token_symbol',
          type: 'string',
        },
        {
          name: 'token_uri',
          type: 'string',
        },
        {
          name: 'base_uri',
          type: 'string',
        },
        {
          name: 'uri_size',
          type: 'u16',
        },
        {
          name: 'path',
          type: {
            vec: 'u16',
          },
        },
      ],
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  67, 117, 114, 118, 101, 67, 111, 110, 102, 105, 103, 117, 114,
                  97, 116, 105, 111, 110,
                ],
              },
            ],
          },
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'fee',
          type: 'f64',
        },
        {
          name: 'admin',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'mint_nft',
      discriminator: [211, 57, 6, 167, 15, 219, 35, 251],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_escrow',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [101, 115, 99, 114, 111, 119, 95, 112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_escrow_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'mint_nft',
          writable: true,
          signer: true,
        },
        {
          name: 'destination',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'mint_nft',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'metadata',
          writable: true,
        },
        {
          name: 'master_edition',
          writable: true,
        },
        {
          name: 'mint_authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121],
              },
              {
                kind: 'account',
                path: 'collection_mint',
              },
            ],
          },
        },
        {
          name: 'collection_mint',
          writable: true,
        },
        {
          name: 'collection_metadata',
          writable: true,
        },
        {
          name: 'collection_master_edition',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'token_metadata_program',
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        },
        {
          name: 'sysvar_instruction',
          address: 'Sysvar1nstructions1111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'sell',
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  67, 117, 114, 118, 101, 67, 111, 110, 102, 105, 103, 117, 114,
                  97, 116, 105, 111, 110,
                ],
              },
            ],
          },
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'pool',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 112, 111,
                  111, 108,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'pool_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_sol_vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
          },
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'swap_nft_to_token',
      discriminator: [243, 88, 201, 103, 57, 114, 83, 50],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_escrow',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [101, 115, 99, 114, 111, 119, 95, 112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
              {
                kind: 'account',
                path: 'pool_escrow.collection',
                account: 'EscrowPool',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_escrow_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'nft_mint',
          writable: true,
        },
        {
          name: 'nft_metadata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 101, 116, 97, 100, 97, 116, 97],
              },
              {
                kind: 'const',
                value: [
                  11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107,
                  4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182,
                  209, 188, 3, 248, 41, 70,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107, 4,
                195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182, 209,
                188, 3, 248, 41, 70,
              ],
            },
          },
        },
        {
          name: 'user_nft_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_escrow_nft_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [],
    },
    {
      name: 'swap_token_to_nft',
      discriminator: [83, 155, 148, 179, 85, 6, 216, 201],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'pool_escrow',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [101, 115, 99, 114, 111, 119, 95, 112, 111, 111, 108],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
              {
                kind: 'account',
                path: 'pool_escrow.collection',
                account: 'EscrowPool',
              },
            ],
          },
        },
        {
          name: 'token_mint',
          writable: true,
        },
        {
          name: 'user_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_escrow_token_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'token_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'nft_mint',
          writable: true,
        },
        {
          name: 'nft_metadata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 101, 116, 97, 100, 97, 116, 97],
              },
              {
                kind: 'const',
                value: [
                  11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107,
                  4, 195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182,
                  209, 188, 3, 248, 41, 70,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                11, 112, 101, 177, 227, 209, 124, 69, 56, 157, 82, 127, 107, 4,
                195, 205, 88, 184, 108, 115, 26, 160, 253, 181, 73, 182, 209,
                188, 3, 248, 41, 70,
              ],
            },
          },
        },
        {
          name: 'user_nft_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'pool_escrow_nft_account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'pool_escrow',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206,
                  235, 121, 172, 28, 180, 133, 237, 95, 91, 55, 145, 58, 140,
                  245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'nft_mint',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142,
                13, 131, 11, 90, 19, 153, 218, 255, 16, 132, 4, 142, 123, 216,
                219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [],
    },
    {
      name: 'update_initialize',
      discriminator: [112, 141, 196, 139, 210, 136, 62, 237],
      accounts: [
        {
          name: 'dex_configuration_account',
          writable: true,
        },
        {
          name: 'pool_sol_curves',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [
                  108, 105, 113, 117, 105, 100, 105, 116, 121, 95, 115, 111,
                  108, 95, 118, 97, 117, 108, 116,
                ],
              },
              {
                kind: 'account',
                path: 'dex_configuration_account',
              },
            ],
          },
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'fee',
          type: 'f64',
        },
        {
          name: 'admin',
          type: 'pubkey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'CurveConfiguration',
      discriminator: [225, 242, 252, 198, 63, 77, 56, 255],
    },
    {
      name: 'EscrowPool',
      discriminator: [100, 55, 158, 23, 77, 91, 180, 104],
    },
    {
      name: 'LiquidityPool',
      discriminator: [66, 38, 17, 64, 188, 80, 68, 129],
    },
  ],
  events: [
    {
      name: 'AcceptFullPoolEvent20',
      discriminator: [254, 33, 149, 78, 127, 232, 211, 205],
    },
    {
      name: 'BuyEvent20',
      discriminator: [110, 13, 139, 23, 204, 249, 247, 249],
    },
    {
      name: 'ClaimAddLiquidityRaydium',
      discriminator: [12, 152, 33, 169, 125, 143, 178, 154],
    },
    {
      name: 'CreatePool20',
      discriminator: [125, 136, 164, 139, 23, 42, 1, 137],
    },
    {
      name: 'CreatePool404',
      discriminator: [197, 117, 152, 50, 55, 185, 93, 162],
    },
    {
      name: 'SellEvent20',
      discriminator: [214, 114, 52, 30, 124, 234, 231, 171],
    },
    {
      name: 'TransferNft',
      discriminator: [23, 186, 231, 233, 237, 252, 184, 210],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAmount',
      msg: 'Invalid amount to swap',
    },
    {
      code: 6001,
      name: 'InvalidFee',
      msg: 'Invalid fee',
    },
    {
      code: 6002,
      name: 'NotOnwer',
      msg: 'NotOnwer',
    },
    {
      code: 6003,
      name: 'PendingAddLiquidity',
      msg: 'Pending add liquidity,',
    },
    {
      code: 6004,
      name: 'PendingBondingCurvers',
      msg: 'Pending Bonding Curvers,',
    },
    {
      code: 6005,
      name: 'ClaimedBondingCurvers',
      msg: 'Claimed Bonding Curvers,',
    },
    {
      code: 6006,
      name: 'PendingInit',
      msg: 'Pending Init',
    },
    {
      code: 6007,
      name: 'LimitMintNft',
      msg: 'Limit Mint 1000 nft',
    },
    {
      code: 6008,
      name: 'InvalidCollection',
      msg: 'Invalid Collection',
    },
    {
      code: 6009,
      name: 'CollectionNotVerified',
      msg: 'Collection Not Verified',
    },
    {
      code: 6010,
      name: 'InvalidSum',
      msg: 'Invalid Sum = 1000',
    },
    {
      code: 6011,
      name: 'EmptyArrayUri',
      msg: 'Empty Array Uri',
    },
  ],
  types: [
    {
      name: 'AcceptFullPoolEvent20',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'amount_token_bought',
            type: 'u64',
          },
          {
            name: 'amount_sol_pool',
            type: 'u64',
          },
          {
            name: 'currency_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'BuyEvent20',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'amount_sol',
            type: 'u64',
          },
          {
            name: 'amount_token',
            type: 'u64',
          },
          {
            name: 'currency_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ClaimAddLiquidityRaydium',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'amount_sol',
            type: 'u64',
          },
          {
            name: 'amount_token',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CreatePool20',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'pool_address',
            type: 'pubkey',
          },
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'creater',
            type: 'pubkey',
          },
          {
            name: 'token_name',
            type: 'string',
          },
          {
            name: 'token_symbol',
            type: 'string',
          },
          {
            name: 'token_uri',
            type: 'string',
          },
          {
            name: 'initial_supply',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CreatePool404',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'collection_address',
            type: 'pubkey',
          },
          {
            name: 'pool_escrow',
            type: 'pubkey',
          },
          {
            name: 'creater',
            type: 'pubkey',
          },
          {
            name: 'token_name',
            type: 'string',
          },
          {
            name: 'token_symbol',
            type: 'string',
          },
          {
            name: 'token_uri',
            type: 'string',
          },
          {
            name: 'initial_supply',
            type: 'u64',
          },
          {
            name: 'base_uri',
            type: 'string',
          },
          {
            name: 'uri_size',
            type: 'u16',
          },
          {
            name: 'path',
            type: {
              vec: 'u16',
            },
          },
        ],
      },
    },
    {
      name: 'CurveConfiguration',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'fees',
            type: 'f64',
          },
          {
            name: 'admin',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'EscrowPool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collection',
            type: 'pubkey',
          },
          {
            name: 'token',
            type: 'pubkey',
          },
          {
            name: 'name',
            type: 'string',
          },
          {
            name: 'symbol',
            type: 'string',
          },
          {
            name: 'base_uri',
            type: 'string',
          },
          {
            name: 'uri_size',
            type: 'u16',
          },
          {
            name: 'path',
            type: {
              vec: 'u16',
            },
          },
          {
            name: 'path_max',
            type: 'u16',
          },
          {
            name: 'path_min',
            type: 'u16',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'count',
            type: 'u16',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'LiquidityPool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'creator',
            type: 'pubkey',
          },
          {
            name: 'token',
            type: 'pubkey',
          },
          {
            name: 'total_supply',
            type: 'u64',
          },
          {
            name: 'reserve_token',
            type: 'u64',
          },
          {
            name: 'reserve_sol',
            type: 'u64',
          },
          {
            name: 'status',
            type: 'u8',
          },
          {
            name: 'type_c',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'SellEvent20',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'token_address',
            type: 'pubkey',
          },
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'amount_token',
            type: 'u64',
          },
          {
            name: 'amount_sol',
            type: 'u64',
          },
          {
            name: 'currency_price',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TransferNft',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collection',
            type: 'pubkey',
          },
          {
            name: 'token',
            type: 'pubkey',
          },
          {
            name: 'pool_escrow',
            type: 'pubkey',
          },
          {
            name: 'from',
            type: 'pubkey',
          },
          {
            name: 'to',
            type: 'pubkey',
          },
          {
            name: 'nft',
            type: 'pubkey',
          },
        ],
      },
    },
  ],
};

export default idl;
