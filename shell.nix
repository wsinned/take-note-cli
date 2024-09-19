let
  # Pinned nixpkgs, deterministic. Last updated: 16/8/24.
  # Look up latest commit at https://github.com/NixOS/nixpkgs/tree/release-24.05
  pkgs = import (fetchTarball("https://github.com/NixOS/nixpkgs/archive/de45f50d35a46096fd57d684b819a720d9396393.tar.gz")) {

    config.allowUnfree = true;

  };
  
in pkgs.mkShell {
  buildInputs = with pkgs; [ 
    cargo 
    rustc
    rustfmt
    clippy
    exercism
    (vscode-with-extensions.override { 
      vscodeExtensions = with vscode-extensions; [
        asvetliakov.vscode-neovim
        rust-lang.rust-analyzer
      ];
    })
  ];
}
